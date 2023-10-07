//*Current date and time*//
let currentTime = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentday = days[currentTime.getDay()];
let currenthour = currentTime.getHours();
let currentminutes = currentTime.getMinutes();

if (currentminutes < 10) {
  currentminutes = `0${currentminutes}`;
}

h2.innerHTML = `${currentday}<br /> ${currenthour}:${currentminutes} <br />Clear`;

//*Search for city*//
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputPassword1");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", findCity);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputPassword1").value;
  findCity(city);
}

let searchForm = document.querySelector("#exampleInputPassword1");
searchForm.addEventListener("submit", handleSubmit);

//*Celcius to Fahrenheit*//
function showFahrenheit(event) {
  event.preventDefault();
  let strong = document.querySelector("strong");
  let celcius = 18;
  let fahrenheit = (celcius * 9) / 5 + 32;
  strong.innerHTML = `${fahrenheit}`;
}

let clickFahrenheit = document.querySelector("#click-fahrenheit");
clickFahrenheit.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  let strong = document.querySelector("strong");
  let celcius = 18;
  strong.innerHTML = `${celcius}`;
}

let clickCelcius = document.querySelector("#click-celcius");
clickCelcius.addEventListener("click", showCelcius);

//*Current Temperature*//
function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityInput = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let strong = document.querySelector("strong");
  strong.innerHTML = `${temperature}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

//*Current Location*//
function retrievePosition(position) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `Latitude = ${lat}<br/> Longitude = ${lon}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemp);
}

function searchPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#location-Button");
currentLocation.addEventListener("click", searchPosition);
