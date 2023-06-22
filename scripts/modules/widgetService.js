import { fetchForecastWeather, fetchWeather } from "./api_service.js";
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
} from "./render.js";

export const startWidget = async () => {
  const city = "Калининград";

  const widget = document.createElement("div");
  widget.classList.add("widget");

  const dataWeather = await fetchWeather(city);
  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError();
  }
  const dataForecastWeather = await fetchForecastWeather(city);
  if (dataForecastWeather.success) {
    const list = dataForecastWeather.data.list;

    renderWidgetForecast(widget, list);
  } else {
    showError();
  }
  return widget;
};
