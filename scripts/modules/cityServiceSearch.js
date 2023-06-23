import { startWidget } from "./widgetService.js";

export const cityServiceSearch = (app, widget) => {
  const button = document.querySelector(".widget__change-city");
  button.addEventListener("click", () => {
    const form = document.createElement("form");
    form.classList.add("widget__form");
    const inputCity = document.createElement("input");
    inputCity.classList.add("widget__input");
    inputCity.name = "city";
    inputCity.type = "search";
    inputCity.placeholder = "Введите город";
    form.append(inputCity);
    widget.append(form);
    inputCity.focus();
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      widget.textContent = "";
      const newWidget = await startWidget(inputCity.value);
      app.textContent = "";
      app.append(newWidget);
      cityServiceSearch(app, newWidget);
    });
  });
  return true;
};
