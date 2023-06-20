import { startWidget } from "./modules/widgetService.js";

const init = (app) => {
  const widget = startWidget();
  app.append(widget);
};

const app = document.querySelector("#app");

init(app);
