import { getCurrentDateTime } from "./utils.js";

const calcDewPoint = (temperature, humidity) => {
  const A = 17.27;
  const B = 237.7;
  const part1 =
    (A * temperature) / (B + temperature) + Math.log(humidity / 100);
  const part2 = B * part1;
  const part3 = A - part1;
  return `${(part2 / part3).toFixed(1)}°C`;
};

export const renderWidgetToday = (widget, data) => {
  const { dayOfMonth, month, year, dayOfWeek, hours, minutes } =
    getCurrentDateTime();
  const weatherIcon = data.weather[0].icon;
  const mainTemp = `${data.main.temp}°C`;
  const feelTemp = `${data.main.feels_like}°C`;
  const html = `
    <div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>
      <div class="widget__icon">
        <img class="widget__img" src="./icon/${weatherIcon}.svg" alt="Погода" />
      </div>
      <div class="widget__wheather">
        <div class="widget__city">
        <p>Калининград</p>
        <button
            class="widget__change-city"
            aria-label="Изменить город"
        ></button>
        </div>
        <p class="widget__temp-big">${mainTemp}</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${feelTemp}</p>
      </div>
    </div>
  `;
  widget.insertAdjacentHTML("beforeend", html);
};
export const renderWidgetOther = (widget, data) => {
  const windSpeed = `${data.wind.speed} м/с`;
  const windAngle = `${data.wind.deg}`;
  const humidity = `${data.main.humidity}%`;
  const pressure = `${
    data.main.pressure > 800
      ? (data.main.pressure / 1.333).toFixed(0)
      : data.main.pressure
  }`;
  const html = `
    <div class="widget__other">
        <div class="widget__wind">
            <p class="widget__wind-title">Ветер</p>
            <p class="widget__wind-speed">${windSpeed}</p>
            <p class="widget__wind-text" style="transform: rotate(${windAngle}deg)">&#8594;</p>
        </div>
        <div class="widget__humidity">
            <p class="widget__humidity-title">Влажность</p>
            <p class="widget__humidity-value">${humidity}</p>
            <p class="widget__humidity-text">Т.Р: ${calcDewPoint(
              data.main.temp,
              data.main.humidity
            )}</p>
        </div>
        <div class="widget__pressure">
            <p class="widget__pressure-title">Давление</p>
            <p class="widget__pressure-value">${pressure}</p>
            <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
    </div>
    `;
  widget.insertAdjacentHTML("beforeend", html);
};
export const renderWidgetForecast = (widget) => {
  const html = `
    <ul class="widget__forecast">
        <li class="widget__day-item">
          <p class="widget__day-text">ср</p>
          <img class="widget__day-img" src="./icon/02d.svg" alt="Погода" />
          <p class="widget__day-temp">18.4°/13.7°</p>
        </li>
        <li class="widget__day-item">
          <p class="widget__day-text">чт</p>
          <img class="widget__day-img" src="./icon/03d.svg" alt="Погода" />
          <p class="widget__day-temp">17.3°/11.3°</p>
        </li>
        <li class="widget__day-item">
          <p class="widget__day-text">пт</p>
          <img class="widget__day-img" src="./icon/04d.svg" alt="Погода" />
          <p class="widget__day-temp">16.5°/10.9°</p>
        </li>
        <li class="widget__day-item">
          <p class="widget__day-text">сб</p>
          <img class="widget__day-img" src="./icon/01d.svg" alt="Погода" />
          <p class="widget__day-temp">18.6°/12.5°</p>
        </li>
        <li class="widget__day-item">
          <p class="widget__day-text">вс</p>
          <img class="widget__day-img" src="./icon/03d.svg" alt="Погода" />
          <p class="widget__day-temp">17.3°/11.2°</p>
        </li>
    </ul>
  `;
  widget.insertAdjacentHTML("beforeend", html);
};

export const showError = (widget) => {
  const html = `<h2>Error fetching data</h2>`;
  widget.classList.add("widget_error");
  widget.insertAdjacentHTML("beforeend", html);
};
