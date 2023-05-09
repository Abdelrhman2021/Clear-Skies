// search input
let searchInput = document.getElementById("searchInput");
let find = document.getElementById("find");
let alert = document.getElementById("alertsearchInput");

// today
let cityName = document.getElementById("cityName");
let todaytem = document.getElementById("today-tem");
let todayIcon = document.getElementById("today-icon");
let todayText = document.getElementById("today-text");
let willRain = document.getElementById("will_rain");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");

// tomorrow
let tomIcon = document.getElementById("tom-icon");
let TomMinTem = document.getElementById("tom-min-tem");
let TomMaxTem = document.getElementById("tom-max-tem");
let TomText = document.getElementById("tom-text");

// after tomorrow
let afterIcon = document.getElementById("aftom-icon");
let afTomMinTem = document.getElementById("aftom-min-tem");
let afTomMaxTem = document.getElementById("aftom-max-tem");
let afTomText = document.getElementById("aftom-text");

// Date
let todayname = document.getElementById("todayname");
let todayDat = document.getElementById("today-date");
let tomname = document.getElementById("tom-name");
let aftomname = document.getElementById("aftom-name");

// Get Date
let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let today = days[date.getDay()];
let aftom = "";
let tom = "";
console.log(today);
if(date.getDay() == 6){
    tom = days[0];
    aftom = days[1];
    console.log(today);
}else if (date.getDay()+1 ==6){
    aftom = days[0];
    tom = days[date.getDay()+1];
}
else{
    tom = days[date.getDay()+1];
    console.log(tom);
    aftom = days[date.getDay()+2];
    console.log(aftom);
}

let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthNum = date.getMonth();
console.log(months[monthNum]);

todayname.innerHTML = today;
tomname.innerHTML = tom;
aftomname.innerHTML = aftom;
todayDat.innerHTML = monthNum + " " + months[monthNum] + " " + date.getFullYear();
tomname.innerHTML = tom;
aftomname.innerHTML = aftom;

console.log("TEST1");
// fetch data
let data="";
function get_data(keyword){
    let myhttp = new XMLHttpRequest();
    myhttp.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=38c80a3f732a419b850184638230405&q=${keyword}&days=3&aqi=no&alerts=no`);
    if(myhttp != 200){
        alert.classList.add("d-none");
    }
    myhttp.send();
    myhttp.addEventListener("load",function(){
        if(myhttp.readyState==4 && myhttp.status==200){
            data = JSON.parse(myhttp.response);
            console.log(data);
            cityName.innerHTML = data.location.name;
            todaytem.innerHTML = data.current.temp_c + " °c";
            todayIcon.setAttribute("src",`https:${data.current.condition.icon}`);
            todayText.innerHTML = data.current.condition.text;
            willRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
            wind.innerHTML = data.current.wind_kph + " km/h";
            direction.innerHTML = data.current.wind_dir;
            tomIcon.setAttribute("src",`https:${data.forecast.forecastday[1].day.condition.icon}`);
            TomMinTem.innerHTML = data.forecast.forecastday[1].day.mintemp_c + " °";
            TomMaxTem.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + " °";
            TomText.innerHTML = data.forecast.forecastday[1].day.condition.text;
            afterIcon.setAttribute("src",`https:${data.forecast.forecastday[2].day.condition.icon}`);
            afTomMaxTem.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + " °";
            afTomMinTem.innerHTML = data.forecast.forecastday[2].day.mintemp_c + " °";
            afTomText.innerHTML = data.forecast.forecastday[2].day.condition.text;
        }
        else if (myhttp.status == 400) { // check if API response returns an error
            alert.classList.remove("d-none");
            console.clear();
        }
        });
}

searchInput.addEventListener("keyup",function(){
        get_data(searchInput.value);
  });

 


get_data("Sharm El Sheikh");
