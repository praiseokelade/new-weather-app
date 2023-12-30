function updateTemperature(response) {
  let temperature = document.querySelector("#temp");
  let currentTemp = response.data.temperature.current;
  temperature.innerHTML = Math.round(currentTemp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
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
