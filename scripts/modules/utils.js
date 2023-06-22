const isNotNullorEmpty = (value) => {
  return !!value;
};

const isValidDate = (value) => {
  const res = new Date(value).toUTCString();
  return !!res;
};

const isDateLessOrEqualFiveDays = (date) => {
  if (isNotNullorEmpty(date) && isValidDate(date)) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date();
    const b = new Date(date);
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY) < 6;
  }
};

export const getDateTime = (dateSrc = null) => {
  const monthes = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  const weekdays = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];
  const shortWeekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  const date = isDateLessOrEqualFiveDays(dateSrc)
    ? new Date(dateSrc * 1000)
    : new Date();
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const month = monthes[date.getMonth()];
  const year = date.getFullYear().toString();
  const dayOfWeek = weekdays[date.getDay()];
  const shortDayOfWeek = shortWeekdays[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return { dayOfMonth, month, year, dayOfWeek, shortDayOfWeek, hours, minutes };
};

export const calcPressure = (pressure) => {
  if (pressure) {
    return pressure > 800
      ? (pressure / 1.333).toFixed(0).toString()
      : pressure.toString();
  } else return "0";
};

export const calcDewPoint = (temperature, humidity) => {
  const A = 17.27;
  const B = 237.7;
  const part1 =
    (A * temperature) / (B + temperature) + Math.log(humidity / 100);
  const part2 = B * part1;
  const part3 = A - part1;
  return `${(part2 / part3).toFixed(1)}°C`;
};

export const calcWindDirection = (angle) => {
  return (angle - 270).toString();
};

export const convertDate = (date) => {
  if (date) {
    const result = new Date(date);
    return result;
  } else {
    return new Date();
  }
};

export const getMinMaxTempObj = (data) => {
  let days = {};
  data.forEach((element) => {
    const dayObj = getDateTime(element.dt);
    const day = `${dayObj.year}-${dayObj.month}-${dayObj.dayOfMonth}`;

    if (Object.keys(days).includes(day) && days[day]?.minTemp) {
      if (element.main.temp_min < days[day].minTemp) {
        days[day].minTemp = element.main.temp_min;
      }
    } else days[day] = { minTemp: element.main.temp_min };
    if (Object.keys(days).includes(day) && days[day]?.maxTemp) {
      if (element.main.temp_max > days[day].maxTemp) {
        days[day].maxTemp = element.main.temp_max;
      }
    } else days[day].maxTemp = element.main.temp_max;
  });
  return days;
};
