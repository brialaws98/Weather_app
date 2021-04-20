let today = document.querySelector("#current-date");
let detailToday= document.querySelector("#dateDetail");

let currentTime = new Date();
let hours = currentTime.getHours();
 if (hours < 10){
    hours = `0${hours}`;
 }

let minutes= currentTime.getMinutes();
 if (minutes < 10){
     minutes = `0${minutes}`
 } 

let dayIndex = currentTime.getDay();
let days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let month= currentTime.getMonth();
let months= [
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
]
let date= currentTime.getDate();
let year= currentTime.getFullYear();
today.innerHTML= `${days[dayIndex]}, ${hours}:${minutes}`;
detailToday.innerHTML= `${months[month]} ${date}, ${year}`;

function search(event){
    event.preventDefault();
   let changeCity=document.querySelector("change-city");
    let apiKey= "f58174ae50eb90059664519b884ea7dc";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&appid=${apiKey}`;
 

let seachCity= document.querySelector("#search-city");

searchCity.addEventListener("submit", search);


