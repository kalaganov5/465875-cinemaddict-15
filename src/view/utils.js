/**
 * Функция занимается отрисовкой элемента
 * @param {*} container - контейнер в который вставляем элемент
 * @param {*} layout - готовая разметка
 * @param {*} place - позиция добавляемого элемента относительно container (контейнера), может быть: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
 */
const renderElement = (container, layout, place = 'beforeend') => {
  container.insertAdjacentHTML(place, layout);
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderDOMStrings = (container, DOMStrings, position = RenderPosition.BEFOREEND) => {
  switch(position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(DOMStrings);
      break;
    case RenderPosition.BEFOREEND:
      container.append(DOMStrings);
      break;
  }
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

/**
 * Удалит переданный элемент из разметки
 * @param {object} element
 */
const removeElement = (element) => {
  element.remove();
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

  // return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
  // return {
  //   hours: hours > 0 ? hours : 0,
  //   minutes: minutes > 0 ? minutes : 0,
  // };
};

/**
 *
 * @param {array} array массив в котором считаем количество повторений
 * @returns объект в где ключ это значение из массива и значение объекта это колличество повторений
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

/**
 *
 * @param {string} template html в виде строки, строка должна иметь общую обертку
 * @returns строку превращаем в DOM-элемент
 */
const createElement = (template) => {
  // console.log(template)
  let wrapper = document.createElement('div');
  wrapper.innerHTML = template.trimLeft();
  if (wrapper.querySelector('.temp-container')) {
    wrapper = wrapper.querySelector('.temp-container').children;
    console.log(wrapper)
    return wrapper;
  }
  return wrapper.firstChild;
};

// const createElement = (template) => {
//   var parser = new DOMParser();
// 	var doc = parser.parseFromString(template, 'text/html');
//   console.log(doc)
//   console.log(this)
// 	return doc.body;
// };

export {renderDOMStrings, createElement, RenderPosition, renderElement, cropText, getDeclension, removeElement, spreadHoursMinutesToMinutes, convertTime, countRepeatedItemInArray, findMaxInObjectElement};
