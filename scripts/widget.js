import { cityServiceSearch } from "./modules/cityServiceSearch.js";
import { startWidget } from "./modules/widgetService.js";

const init = async (app) => {
  const city = "Москва";
  const widget = await startWidget(city);
  app.append(widget);

  cityServiceSearch(app, widget);
};

const app = document.querySelector("#app");

init(app);
