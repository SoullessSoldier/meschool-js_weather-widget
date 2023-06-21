import { fetchWeather } from "./api_service.js";
import {
  renderWidgetToday,
  renderWidgetOther,
  renderWidgetForecast,
} from "./render.js";

export const startWidget = async () => {
  const widget = document.createElement("div");
  widget.classList.add("widget");

  const dataWeather = await fetchWeather("Калининград");
  if (dataWeather.success) {
    console.log(dataWeather);
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError();
  }

  renderWidgetForecast(widget);
  return widget;
};
