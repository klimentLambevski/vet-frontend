export function formatDate(date) {
  let monthNames = [
    "Јануари", "Фебруари", "Март",
    "Април", "Мај", "Јуни", "Јули",
    "Август", "Септември", "Октомври",
    "Ноември", "Декември"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}