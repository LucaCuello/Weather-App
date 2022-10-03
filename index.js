const searchInput = document.getElementById("search--input"),
  searchButton = document.getElementById("search--button"),
  form = document.getElementById("form"),
  cloud = document.getElementById("cloud"),
  weatherSection = document.getElementById("weather--info"),
  apiKey = "e42b1761cc8e126c964f37d3c0677923",
  animationContainer = document.getElementById("animation--container");

const rainAnimation = `
  <div class="animated--cloud"></div>
    <div class="animated-rain">
      <span style="--i:10"></span>
      <span style="--i:12"></span>
      <span style="--i:14"></span>
      <span style="--i:13"></span>
      <span style="--i:19"></span>
      <span style="--i:17"></span>
      <span style="--i:18"></span>
      <span style="--i:11"></span>
      <span style="--i:15"></span>
      <span style="--i:10"></span>
      <span style="--i:13"></span>
      <span style="--i:10"></span>
      <span style="--i:17"></span>
      <span style="--i:10"></span>
    </div>              
`;

const sunnyAnimation = `
  <div class="sun"></div>
`;

const cloudyAnimation = `
  <div class="animated--cloud cloudy cloud--1"></div>
  <div class="animated--cloud cloudy cloud--2"></div>
  <div class="animated--cloud cloudy cloud--3"></div>
`;

const snowAnimation = `
<div class="animated--cloud cloud--snow"></div>
<div class="animated-snow">
  <span style="--i:10"></span>
  <span style="--i:12"></span>
  <span style="--i:14"></span>
  <span style="--i:13"></span>
  <span style="--i:19"></span>
  <span style="--i:17"></span>
  <span style="--i:18"></span>
  <span style="--i:11"></span>
</div> 
`;

const mistAnimation = `
<div class="animated--cloud cloudy cloud--1 mist"></div>
<div class="animated--cloud cloudy cloud--2 mist"></div>
<div class="animated--cloud cloudy cloud--3 mist"></div>
`;

const cloudAnimation = () => {
  searchInput.addEventListener("focus", () => {
    cloud.style.transform = "scale(1.07)";
  });
  searchInput.addEventListener("blur", () => {
    cloud.style.transform = "scale(1)";
  });
};

const changeWeatherAnimation = (info) => {
  if (info === "Clear") {
    return sunnyAnimation;
  } else if (info === "Clouds") {
    return cloudyAnimation;
  } else if (info === "Rain") {
    return rainAnimation;
  } else if (info === "Snow") {
    return snowAnimation;
  } else if (info === "Mist") {
    return mistAnimation;
  }
};

const opacityAnimation = () => {
  const weatherInfo = document.getElementById("test");
  weatherInfo.style.opacity = "1";
};

const fetchWeather = async (city) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
  const query = `?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const getData = await fetch(baseURL + query);
    const data = await getData.json();
    renderHTML(data);
  } catch (error) {
    return (
      console.log(error),
      showError("We didn't find that city..."),
      (weatherSection.style.opacity = "0")
    );
  }
};

const getCity = () => {
  const city = searchInput.value.trim();
  fetchWeather(city);
  form.reset();
};

const sectionAnimation = () => {
  weatherSection.style.opacity = "1";
};

const roundTemp = (temp) => {
  if (temp > 1) {
    return Math.round(temp);
  } else if (temp < 1) {
    return temp;
  }
};

const renderHTML = (cityInfo) => {
  sectionAnimation();
  const { country } = cityInfo.sys;
  const { description, main } = cityInfo.weather[0];
  const { name } = cityInfo;
  const { temp, temp_max, temp_min, humidity } = cityInfo.main;
  weatherSection.innerHTML = `
  <div class="weather--info--container" id="test">
  <div class="weather--main--info">
      <h2>
          <span class="highmark">
              ${name}, <span class="highmark--country">${country}</span>
          </span>
      </h2>
      <div class="animation--container" id="animation--container">
        ${changeWeatherAnimation(main)}
      </div>
      <h3>${description}</h3>
      <span class="temperature">
          <i class="fa-solid fa-temperature-half"></i>
          ${roundTemp(temp)}°
      </span>
  </div>
  <div class="weather--secondary--info">
      <span>
          <i class="fa-solid fa-temperature-arrow-up"></i> 
          ${roundTemp(temp_max)}°
          <span class="highmark--bold">Max</span>
      </span>
      <span>
          <i class="fa-solid fa-temperature-arrow-down"></i>
          ${roundTemp(temp_min)}°
          <span class="highmark--bold">Min</span>
      </span>
  </div>
  <div class="weather--terciary--info">
      <span>
          <i class="fa-solid fa-water"></i>
          ${humidity}%
          <span class="highmark--bold">Humidity</span>
      </span>
  </div>
</div>
<span class="github">
  <a href="https://github.com/lukeraig" target="_blank">
    <i class="fa-brands fa-github"></i> 
    Github
  </a>
</span>
  `;
  setTimeout(opacityAnimation, 600);
};

const showError = (message) => {
  (error.style.transform = "scale(1)"),
    (error.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${message}`),
    (weatherSection.style.opacity = "0");
};

const isCityValid = () => {
  if (searchInput.value === "") {
    return showError("This field can't be empty!");
  } else {
    error.style.transform = "scale(0)";
    getCity();
  }
};

const init = () => {
  cloudAnimation();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isCityValid();
  });
};

init();
