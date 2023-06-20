export const getCurrentDateTime = () => {
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
  const date = new Date();
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const month = monthes[date.getMonth()];
  const year = date.getFullYear().toString();
  const dayOfWeek = weekdays[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return { dayOfMonth, month, year, dayOfWeek, hours, minutes };
};
