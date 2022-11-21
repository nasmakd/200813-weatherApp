$(document).ready(function(){ 
    var city = []; // 사용자가 클릭한 곳을 알 수 없음
    var myKey = "e78098820f1dd1a7d19debf445f23991";
    var state_icon = "";

    var w_box = `
    <li>
        <div class="top">
            <div class="cur_icon"><i class="wi"></i></div>
        
            <div class="info">
                <p class="temp"><span>10</span>&nbsp;℃</p>
                <h4>Clouds</h4>
                <p><span class="city">London</span>,&nbsp;<span class="nation">uk</span></p>
            </div>
        </div>
        <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span></span>&nbsp;m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span></span>&nbsp;%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloudy"></i>
                <p><span></span>&nbsp;%</p>
            </div>
        </div>
    </li>
    `;


    //배열 데이터의 갯수를 활용하여 각 도시의 날씨 정보를 받는다면 
    function w_info(){

        //배열데이터의 갯수와 상관없이 날씨 박스는 모두 제거한다.
        $("#weather ul").empty();

        //현재 배열의 갯수만큼 다시 반복하여 생성해라(갱신 - renewal)
        for(i=0;i<city.length;i++){
            $("#weather ul").append(w_box);
        }

        $("#weather ul li").each(function(index){

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q="+city[index]+"&appid="+myKey,
                dataType : "json",
                success : function(data){
                    console.log(data);
                    console.log("현재온도(℃) : " + (data.main.temp - 273.15));
                    var temp = data.main.temp - 273.15;
                    console.log("현재습도(%) : " + data.main.humidity);
                    var humidity = data.main.humidity;
                    console.log("현재날씨 : " + data.weather[0].main);
                    var weather = data.weather[0].main;
                    console.log("현재 바람의 속도(m/s) : " + data.wind.speed);
                    var wind = data.wind.speed;
                    console.log("국가 : " + data.sys.country);
                    var nation = data.sys.country;
                    console.log("도시 : " + data.name);
                    var region = data.name;
                    console.log("구름양 : " + data.clouds.all);
                    var cloud = data.clouds.all;

                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloudy";
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Snow"){
                        state_icon = "wi-snow";
                    }else if(weather == "Drizzle"){
                        state_icon = "wi-hail";
                    }

                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(index).find(".temp span").text(parseInt(temp));
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".city").text(region);
                    $("#weather li").eq(index).find(".nation").text(nation);
                    $("#weather li").eq(index).find(".wind p span").text(wind);
                    $("#weather li").eq(index).find(".humidity p span").text(humidity);
                    $("#weather li").eq(index).find(".cloud p span").text(cloud);
                }
            }); //ajax 종료
        }); //each문 종료
    };

    $(".cities button").click(function(){
        var $city_new = $(this).text(); //클릭한 곳의 텍스트를 저장
        city.push($city_new);  //배열데이터의 마지막 위치에 넣겠다는 의미
        console.log(city);
        $(this).hide();
        w_info();
    });






});