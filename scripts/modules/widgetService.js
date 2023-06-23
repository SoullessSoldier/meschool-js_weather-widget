import { fetchForecastWeather, fetchWeather } from "./api_service.js";
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
  showError,
} from "./render.js";

export const startWidget = async (city) => {
  const widget = document.createElement("div");
  widget.classList.add("widget");

  const dataWeather = await fetchWeather(city);
  if (dataWeather.success) {
    renderWidgetToday(
      widget,
      dataWeather.data,
      dataWeather.name,
      dataWeather.country
    );
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(widget, city);
  }
  const dataForecastWeather = await fetchForecastWeather(city);
  if (dataForecastWeather.success) {
    const list = dataForecastWeather.data.list;

    renderWidgetForecast(widget, list);
  } else {
    showError(widget);
  }
  return widget;
};
