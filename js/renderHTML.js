import { getMonthDayAndWeekDay } from "./date.js";

const { month, day, weekDay } = getMonthDayAndWeekDay();

const renderHTML = (cityName, state, WeatherText, Temperature) => `
    <h2><strong>${cityName}</strong>, ${state}</h2>
    <h3>${WeatherText}</h3>
    <div class="date">
      <p>${month} ${day}, ${weekDay}</p>
    </div>

    <div class="box-temperature">
      <p>${Temperature.Metric.Value}°</p>
    </div>

    <div class="box-max-and-min">
      <div class="above-zero">
        <span class="track-above-zero"></span>
      </div>
      <span class="zero-or-one">0</span>
      <div class="below-zero">
        <span class="track-below-zero"></span>
      </div>
    </div>
`;

export default renderHTML;
