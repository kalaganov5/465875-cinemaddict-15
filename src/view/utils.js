/**
 *
 * @param {*} text
 * @returns
 */
const cropText = (text) => {
  if (text.length > 50) {
    text = `${text.substr(0,50)}...`;
  }
  return text;
};

/**
 *
 * @param {*} number - число
 * @param {*} textArray массив с вариантами склонений, пример ['частица','частицы', 'частиц']
 * @returns вернёт вариант с правильным склонением
 */
const getDeclension = (number, textArray) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return textArray[
    (number % 100 > 4 && number % 100 < 20) ?
      2 : cases[(number % 10 < 5) ?
        number % 10 : 5]];
};

/**
 * Переведет строку вида "1h 1m" в минуты = 61
 * @param {sting} duration время в формате "1h 1m"
 * @returns время в минутах
 */
const spreadHoursMinutesToMinutes = (duration) => {
  let hours = 0;
  let minutes = 0;
  duration = duration.split(' ');
  duration.forEach((time) => {
    // Считаем часы
    if (time.slice(-1) === 'h') {
      hours = +time.replace(time.slice(-1), '');
    } else if (time.slice(-1) === 'm') {
      minutes = +time.replace(time.slice(-1), '');
    }
  });
  return (hours * 60) + minutes;
};

/**
 *
 * @param {number} durationMinutes минуты
 * @returns конвертирует минуты в формат "ЧАСЫ МИНУТЫ"
 */
const convertTime = (durationMinutes) => {
  const hours = Math.trunc(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;

};

/**
 *
 * @param {array} array массив в котором считаем количество повторений
 * @returns объект в где ключ это значение из массива и значение объекта это количество повторений
 */
const countRepeatedItemInArray = (array) => (
  array.reduce((accumulator, element) => {
    accumulator[element] = (accumulator[element] || 0) + 1;
    return accumulator;
  }, {})
);

/**
 * { "привет": 2, "hi": 1 }
 *  @param object объект
 *  @returns вернёт ключ который чаще встречается
 */
const findMaxInObjectElement = (object) => {
  let topValue = 0;
  for (const key in object) {
    if (object[key] > topValue) {
      topValue = key;
    }
  }
  return topValue;
};

export {cropText, getDeclension, spreadHoursMinutesToMinutes, convertTime, countRepeatedItemInArray, findMaxInObjectElement};
