/**
 * @param {*} min минимальное значение
 * @param {*} max максимальное значение
 * @returns Возвращает случайное число из диапазона от и до
 * Формула взята https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE
 */
const getRandomInteger = (min, max) => {
  if (min === max) {
    return Error('Неверное значение');
  }
  // большее и меньшее вычислим с помощью Math.min и Math.max, чтобы пользователю не запоминать очередность
  // с помощью Math.abs переведём отрицательное число в положительное
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor((Math.max(Math.abs(min), Math.abs(max))));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Добавляет в массив уникальные значения, если массив переполнен, будет ошибка
 * @param {Array} array - массив в который будет добавлять уникальные значения/id
 * @param {Number} maxNumber - максимальное количество id, по умолчанию 9 999
 * Дополнительно вернёт текущее значение
 */
const getRandomUniqueNumber = (array, maxNumber = 9999) => {
  if (array.length === (maxNumber)) {
    throw new Error ('getRandomUniqueNumber - Массив переполнен!');
  }
  let randomInteger = getRandomInteger(1, maxNumber);
  while (array.includes(randomInteger)) {
    randomInteger = getRandomInteger(1, maxNumber);
  }
  array.push(randomInteger);
  return randomInteger;
};

/**
 *
 * @param {array} array - массив с данными
 * @return Возвращает случайный элемент из массива
 */
const getRandomElement = (array) => {
  // Если элементов в массиве один
  if (array.length === 1) {
    return array[0];
  }
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

/**
 *
 * @param {array} array - массив с данными
 * @return Возвращает случайный элементы из массива
 */
const getRandomElements = (array) => {
  const newArray = Array.from(array);
  const countRandomElements =
    (newArray.length === 1) ?
      1 : getRandomInteger(1, newArray.length);
  const elements = [];
  for (let i = 0; i < countRandomElements; i++) {
    const randomElement = getRandomElement(newArray);
    // Добавляем этот элемент в наш массив
    elements.push(randomElement);
    // Удаляем элемент из прошлого массива
    newArray.splice(newArray.indexOf(randomElement), 1);
  }
  return elements;
};

export {getRandomInteger, getRandomUniqueNumber, getRandomElement, getRandomElements};
