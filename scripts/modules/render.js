import {
  calcPressure,
  calcDewPoint,
  calcWindDirection,
  getDateTime,
  getMinMaxTempObj,
} from "./utils.js";

export const renderWidgetToday = (widget, data, name, country) => {
  const { dayOfMonth, month, year, dayOfWeek, hours, minutes } = getDateTime();
  const weatherIcon = data.weather[0].icon;
  const mainTemp = `${data.main.temp.toFixed(1)}°C`;
  const feelTemp = `${data.main.feels_like.toFixed(1)}°C`;
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
        <p>${name}, ${country}</p>
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
  const windSpeed = `${data.wind.speed}  м/с`;
  const windAngle = data.wind.deg;
  const humidity = `${data.main.humidity}%`;
  const pressure = `${calcPressure(data.main.pressure)}`;
  const html = `
    <div class="widget__other">
        <div class="widget__wind">
            <p class="widget__wind-title">Ветер</p>
            <p class="widget__wind-speed">${windSpeed}</p>
            <p class="widget__wind-text" style="transform: rotate(${calcWindDirection(
              windAngle
            )}deg)">&#8594;</p>
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
export const renderWidgetForecast = (widget, data) => {
  const data12Hour = data.filter((element) =>
    element.dt_txt.includes("12:00:00")
  );
  const daysTempObj = getMinMaxTempObj(data);
  const ul = document.createElement("ul");
  ul.classList.add("widget__forecast");
  for (const item of data12Hour.slice(0, 5)) {
    const dayWeather = getDateTime(item.dt);
    const day = dayWeather.shortDayOfWeek;
    const icon = item.weather[0].icon;
    const dateStr = `${dayWeather.year}-${dayWeather.month}-${dayWeather.dayOfMonth}`;
    const tempMax = `${daysTempObj[dateStr].maxTemp.toFixed(1)}°`;
    const tempMin = `${daysTempObj[dateStr].minTemp.toFixed(1)}°`;

    const li = document.createElement("li");
    li.classList.add("widget__day-item");
    const pDay = document.createElement("p");
    const img = document.createElement("img");
    const pTemp = document.createElement("p");
    pDay.classList.add("widget__day-text");
    pDay.textContent = day;
    img.classList.add("widget__day-img");
    img.src = `./icon/${icon}.svg`;
    img.alt = "Погода";
    pTemp.classList.add("widget__day-temp");
    pTemp.textContent = `${tempMax}/${tempMin}`;
    li.append(pDay, img, pTemp);
    ul.append(li);
  }
  widget.append(ul);
};

export const showError = (widget, name) => {
  const html1 = `
  <div class="widget__city widget__city_err">
        <p>${name}</p>
        <button
            class="widget__change-city"
            aria-label="Изменить город"
        ></button>
        </div>`;
  const html2 = `
  <h2>Error fetching data</h2>`;
  widget.classList.add("widget_error");
  if (name) {
    widget.insertAdjacentHTML("beforeend", html1 + html2);
  } else {
    widget.insertAdjacentHTML("beforeend", html2);
  }
};
