// search button with an event listener
var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

var cityStateApi = `https://api.openweathermap.org/data/2.5/weather?q=Andover&appid=fd2e05144199f31e5bf84141bbf6ec0c`;

var apiKey = "fd2e05144199f31e5bf84141bbf6ec0c";

var button = document.querySelector(".btn");

var inputField = document.querySelector(".inputField");

var todaysWeatherEl = document.querySelector(".todayWeather");

var fiveDayWeatherEl = document.querySelector(".fiveDayForecast");

var today = dayjs().format("M/D/YYYY");

var todaysWeatherData;

var forecastWeather;

function getCoordinates() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      todaysWeatherData = data;
      getFiveDayForecast(data.coord.lat, data.coord.lon);
    });
}

function getFiveDayForecast(latParameter, lonParameter) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latParameter}&lon=${lonParameter}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      forecastWeather = data;
      console.log(forecastWeather);
      displayTodaysWeather(data);
      displayFiveDayForecast(data);
    });
}

function displayTodaysWeather() {
  //console log the values from line 28 in README-- data.''''.''''
  //Create an empty div container in HTML to dynamically append with JS.
  todaysWeatherEl.innerHTML = "";
  console.log(todaysWeatherData);
  var title = document.createElement("h1");
  title.innerHTML = todaysWeatherData.name;
  todaysWeatherEl.appendChild(title);
  var date = document.createElement("h2");
  date.innerHTML = today;
  todaysWeatherEl.appendChild(date);
  var weatherIcon = document.createElement("img");
  var icon = todaysWeatherData.weather[0].icon;
  console.log(icon);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.setAttribute(
    "alt",
    `${todaysWeatherData.weather[0].description}`
  );
  todaysWeatherEl.appendChild(weatherIcon);
  var temperature = document.createElement("p");
  temperature.innerHTML = `Temp: ${todaysWeatherData.main.temp}`;
  todaysWeatherEl.appendChild(temperature);
  var humidity = document.createElement("p");
  humidity.innerHTML = `Humidity: ${todaysWeatherData.main.humidity}`;
  todaysWeatherEl.appendChild(humidity);
  var windspeed = document.createElement("p");
  windspeed.innerHTML = `WindSpeed: ${todaysWeatherData.wind.speed}MPH`;
  todaysWeatherEl.appendChild(windspeed);
}

function displayFiveDayForecast() {
  fiveDayWeatherEl.innerHTML = "";
  for (let i = 0; i < forecastWeather.list.length; i = i + 8) {
    var forecastCard = document.createElement("div");
    var dateForecast = document.createElement("h2");
    var forecastDate = dayjs(forecastWeather.list[i].dt_txt).format("M/D/YYYY");
    dateForecast.innerHTML = forecastDate;
    forecastCard.appendChild(dateForecast);
    var weatherIconForecast = document.createElement("img");
    weatherIconForecast.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${forecastWeather.list[i].weather[0].icon}.png`
    );
    weatherIconForecast.setAttribute(
      "alt",
      `${forecastWeather.list[i].weather[0].description}`
    );
    forecastCard.appendChild(weatherIconForecast);
    var temperatureForecast = document.createElement("p");
    temperatureForecast.innerHTML = `Temp: ${forecastWeather.list[i].main.temp}`;
    forecastCard.appendChild(temperatureForecast);
    var humidityForecast = document.createElement("p");
    humidityForecast.innerHTML = `Humidity: ${forecastWeather.list[i].main.humidity}`;
    forecastCard.appendChild(humidityForecast);
    var windspeedForecast = document.createElement("p");
    windspeedForecast.innerHTML = `WindSpeed: ${forecastWeather.list[i].wind.speed}MPH`;
    forecastCard.appendChild(windspeedForecast);
    fiveDayWeatherEl.appendChild(forecastCard);
  }
}

button.addEventListener("click", function () {
  getCoordinates();
});
