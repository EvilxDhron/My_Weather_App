const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const notFoundSection = document.querySelector(".not-found");
const weatherInfoSection = document.querySelector(".weather-info");
const searchCitySection = document.querySelector(".search-city");

const countryName = document.querySelector(".country-text");
const currentDate = document.querySelector(".current-date-text");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const countryTempText = document.querySelector(".temp-text");
const conditionText = document.querySelector(".condition-text");
const humidityValue = document.querySelector(".humidity-value-text");
const windValue = document.querySelector(".wind-value-text");

const apiKey = "bbe61a4c8d7f44c73200b9df8f3d1755";

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    console.log(cityInput.value);
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() != "") {
    console.log(cityInput.value);
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}

function getWeatherImg(id) {
  let img = "";
  if (id <= 232) {
    img = "1146860.png";
  } else if (id <= 321) {
    img = "9342323.png";
  } else if (id <= 531) {
    img = "rain.svg";
  } else if (id <= 622) {
    img = "2361273671641457984-64.png";
  } else if (id <= 781) {
    img = "10425773121600621643-64.png";
  } else if (id == 800) {
    img = "115492004716268572233431-64.png";
  } else if (id <= 804) {
    img = "clouds.svg";
  }

  return img;
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
  showDisplaySection(weatherInfoSection);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryName.textContent = country;
  countryTempText.textContent = Math.round(temp) + " °C";
  conditionText.textContent = main;
  humidityValue.textContent = humidity + " %";
  windValue.textContent = speed + " M/s";

  weatherSummaryImg.src = `/Weather_App/Assets/${getWeatherImg(id)}`;

  console.log(weatherData);
}

function showDisplaySection(section) {
  [weatherInfoSection, notFoundSection, searchCitySection].forEach(
    (sec) => (sec.style.display = "none")
  );
  section.style.display = "flex";
}
