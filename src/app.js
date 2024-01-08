function updateTemperature(response) {
  let temperature = document.querySelector("#temp");
  let currentTemp = response.data.temperature.current;
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  temperature.innerHTML = Math.round(currentTemp);
  cityName.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img
   src="${response.data.condition.icon_url}"
   class="weather-app-icon"
 />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 0) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "017e2af483beec2b2e23fafdtf1f298o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(updateTemperature);
}

function replaceCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", replaceCity);

searchCity("Manchester");

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = forecastHtml + `<div class="weather-forecast-date">
            <div class="weather-forecast-day">${day}</div>
            <div class="weather-forecast-icon">☁️</div>
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-max-temp">12°</span>
              <span class="weather-forecast-min-temp">6°</span>
            </div>
          </div>`;
  });

  forecast.innerHTML = forecastHtml
}

displayForecast();
