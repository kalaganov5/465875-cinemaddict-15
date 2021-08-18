/**
 * Функция занимается отрисовкой элемента
 * @param {*} container - контейнер в который вставляем элемент
 * @param {*} layout - готовая разметка
 * @param {*} place - позиция добавляемого элемента относительно container (контейнера), может быть: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
 */
const renderElement = (container, layout, place) => {
  container.insertAdjacentHTML(place, layout);
};

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

export {renderElement, cropText, getDeclension};
