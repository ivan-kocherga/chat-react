export function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function beautifulDate(i) {
  if (i < 10) {
    return "0" + i;
  }
  return i;
}

export function date(stamp) {
  let date = new Date(+stamp);

  return `${beautifulDate(date.getHours())}:${beautifulDate(
    date.getMinutes()
  )} ${beautifulDate(date.getDay())}-${beautifulDate(
    date.getMonth() + 1
  )}-${date.getFullYear()}`;
}
