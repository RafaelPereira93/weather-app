import { getHours, getMonthDayAndWeekDay } from "./date.js";
import { getAPIUrl, dataCity } from "./api.js";
import renderHTML from "./renderHTML.js";

const box_wrapper_weather = document.querySelector(".wrapper-weather");
const form_search = document.querySelector(".form-search");
const input_search = document.querySelector(".search_location");
const box_hours = document.querySelector(".box-hours");
const content_wrapper = document.querySelector(".content-wrapper");

setInterval(() => {
  const { hours, minutes } = getHours();
  box_hours.innerHTML = `<p>${hours}:${minutes}</p>`;
}, 1000);

const clearInputValue = () => (input_search.value = "");

const showBoxWeather = () => box_wrapper_weather.classList.remove("d-none");

const isDayOrNight = (isDayTime) => {
  isDayTime
    ? box_wrapper_weather.setAttribute("class", "wrapper-weather isDay")
    : box_wrapper_weather.setAttribute("class", "wrapper-weather isNight");
};

form_search.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = input_search.value.trim();

  if (inputValue.length === 0) {
    alert("Digite um valor válido");
    return;
  }

  const urlToGetAPiKey = getAPIUrl(inputValue);
  getCityKey(urlToGetAPiKey);

  clearInputValue(inputValue);
});

const getCityKey = async (url) => {
  try {
    const response = await fetch(url);

    const json = await response.json();

    if (json.length === 0) {
      throw new Error("Digite uma cidade válida");
    }

    const [
      {
        Key,
        Country: { ID },
        LocalizedName,
      },
    ] = json;

    getDataCity(ID, LocalizedName, Key);
  } catch (error) {
    alert(error.message);
  }
};

const getDataCity = async (state, cityName, cityKey) => {
  const [{ IsDayTime, Temperature, WeatherText }] = await dataCity(cityKey);
  const allDataCity = { IsDayTime, Temperature, WeatherText, state, cityName };
  renderWeatherToHTML(allDataCity);
};

const setColorToTrack = (element, color) => (element.style.background = color);

const renderWeatherToHTML = (dataCity) => {
  const { IsDayTime, Temperature, WeatherText, cityName, state } = dataCity;

  isDayOrNight(IsDayTime);

  const HTMLTemplate = renderHTML(cityName, state, WeatherText, Temperature);

  content_wrapper.innerHTML = HTMLTemplate;

  Temperature.Metric.Value > 0
    ? setColorToTrack(
        document.querySelector(".track-above-zero"),
        "rgb(255, 180, 84)"
      )
    : setColorToTrack(
        document.querySelector(".track-below-zero"),
        "rgb(138, 138, 152)"
      );

  showBoxWeather();
};
