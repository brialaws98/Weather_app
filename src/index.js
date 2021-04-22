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

  let forcastHTML=`<div class="row">`;
forcastElement.innerHTML=forcastHTML;
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
}




function searchHome (city){
  let apiKey = "a1efc4a7356688ae30bb6a1809d1bb99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton=document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", displayCurrentLocation);

 function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    ceLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celTemperature * 9 / 5) + 32;
    
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelTemperature(event){
   event.preventDefault();
 
     let temperatureElement = document.querySelector("#temperature");
      ceLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      
    temperatureElement.innerHTML= Math.round(celTemperature);
}


let celsiusTemperature = null;

displayForcast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let ceLink= document.querySelector("#celsius-link");
 ceLink.addEventListener("click", displayCelTemperature);

searchHome("Baltimore");