let today = document.querySelector("#current-date");
let detailToday = document.querySelector("#dateDetail");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let month = currentTime.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let date = currentTime.getDate();
let year = currentTime.getFullYear();
today.innerHTML = `${days[dayIndex]}, ${hours}:${minutes}`;
detailToday.innerHTML = `${months[month]} ${date}, ${year}`;

function formatDay(timestamp) {
  let date= new Date(timestamp * 1000);
  let day= date.getDay();
  let days= [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ]

    return days[day];
}

function displayForecast(response){
  let forecast= response.data.daily;
  let forecastElement=document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;
   forecast.forEach(function (forecastDay, index) {
 if (index < 4) {
   forecastHTML= 
     forecastHTML + `
     <div class="col-3">
  <div class="weather-forcast-date">
     ${formatDay(forecastDay.dt)}
 </div>
 <div>
    <img
     src= "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png";
     alt=""
     width="36"
  />
 </div>
 
 <div class="weather-forcast-temperature">
 <span class="weather-forcast-max">
   ${Math.round(forecastDay.temp.max)}°
 </span>|
 <span class="weather-forcast-min">
 ${Math.round(forecastDay.temp.min)}°
 </span>    
 </div>
 
   </div>
 `;}
});
forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
let apiKey = "a1efc4a7356688ae30bb6a1809d1bb99";
let apiUrl=
`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
  
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML= response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celTemperature=response.data.main.temp;

  getForecast(response.data.coord);
}




function searchHome (city){
  let apiKey = "a1efc4a7356688ae30bb6a1809d1bb99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchHome(city);
}



let seachCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSubmit);


function searchLocation(position) {
  let apiKey = "a1efc4a7356688ae30bb6a1809d1bb99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton=document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", displayCurrentLocation);

searchHome("Baltimore");