function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon")

  
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  descriptionElement.innerHTML= response.data.condition.description;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  liveForecast(response.data.city);
}


function search(city) {
  let searchInputElement = document.querySelector("#search-input");
  let apiKey = "fbeat7a34efb4a7e60ae9e40fbb3ccoa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}


function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  search(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function liveForecast(city) {
  let apiKey = "fbeat7a34efb4a7e60ae9e40fbb3ccoa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(display);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[date.getDay()];
}
function display(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function(day,index) {
    if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class= "weather-forecast-icon" alt="" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
    }
  });


  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

search("Abuja");