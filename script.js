// search button with an event listener
var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

var cityStateApi = `https://api.openweathermap.org/data/2.5/weather?q=Andover&appid=fd2e05144199f31e5bf84141bbf6ec0c`;

var apiKey = "fd2e05144199f31e5bf84141bbf6ec0c";

var button = document.querySelector(".btn");

var inputField = document.querySelector(".inputField");

var todaysWeatherEl = document.querySelector(".todayWeather");

function getCoordinates() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${apiKey}`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data.coord.lat);
      getFiveDayForecast(data.coord.lat, data.coord.lon);
    });
}

function getFiveDayForecast(latParameter, lonParameter) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latParameter}&lon=${lonParameter}&appid=${apiKey}`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayTodaysWeather(data);
      displayFiveDayForecast(data);
    });
}

function displayTodaysWeather(dataParameter) {
  //console log the values from line 28 in README-- data.''''.''''
  //Create an empty div container in HTML to dynamically append with JS.
  todaysWeatherEl.innerHTML = "";
  console.log(dataParameter.city.name);
  var title = document.createElement("h1");
  title.innerHTML = dataParameter.city.name;
  todaysWeatherEl.appendChild(title);
  console.log(dataParameter.list[0].dt_txt);
  var date = document.createElement("h2");
  date.innerHTML = dataParameter.list[0].dt_txt;
  todaysWeatherEl.appendChild(date);
  var weatherIcon = document.createElement("img");
  var icon = dataParameter.list[0].weather[0].icon;
  console.log(icon);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  todaysWeatherEl.appendChild(weatherIcon);
}

function displayFiveDayForecast(dataParameter) {
  //create div container for 5-day forecast.
  //get one card working first, then move on to for loop.
  for (let i = 0; i < dataParameter.list.length; i = i + 8) {
    todaysWeatherEl.innerHTML = "";
  console.log(dataParameter.city.name);
  var title = document.createElement("h1");
  title.innerHTML = dataParameter.city.name;
  todaysWeatherEl.appendChild(title);
  console.log(dataParameter.list[i].dt_txt);
  var date = document.createElement("h2");
  date.innerHTML = dataParameter.list[i].dt_txt;
  todaysWeatherEl.appendChild(date);
  var weatherIcon = document.createElement("img");
  var icon = dataParameter.list[i].weather[i].icon;
  console.log(icon);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  todaysWeatherEl.appendChild(weatherIcon);
    console.log(dataParameter.list[i]);
  }
}

button.addEventListener("click", function () {
  getCoordinates();
});
