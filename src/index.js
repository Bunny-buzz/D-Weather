let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${date}, ${hours}: ${minutes}`;

//Feature 1
function showPosition(response) {
  // console.log(response);
  let city = document.querySelector("h1");
  document.querySelector("h2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  city.innerHTML = `${response.data.name}`;
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "d431d2ed9ff419b2288a607b5abcf652";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showPosition);
}
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-box");
searchForm.addEventListener("submit", handleSearch);

//Bonus Feature
function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(getTemperature, error);
}

function getTemperature(position) {
  let apiKey = "d431d2ed9ff419b2288a607b5abcf652";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showPosition);
}

// Extra callback function for current postion; handles for errors
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// navigator.geolocation.getCurrentPosition(getTemperature);
let searchIcon = document.querySelector("#current-location");
searchIcon.addEventListener("click", getCurrentCity);
