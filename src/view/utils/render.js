/**
 * Функция занимается отрисовкой элемента
 * @param {*} container - контейнер в который вставляем элемент
 * @param {*} layout - готовая разметка
 * @param {*} place - позиция добавляемого элемента относительно container (контейнера), может быть: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
 */
const renderElement = (container, layout, place = 'beforeend') => {
  container.insertAdjacentHTML(place, layout);
};

/**
 * Функция для более удобной выбора местоположения вставки
 */
const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

/**
 * Функция вставит элементы в разметку
 * @param {*} container контейнер для вставки dom элементов
 * @param {string} DOMStrings - строка с готовой разметкой html
 * @param {string} position - расположение из функции RenderPosition
 */
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
 * Удалит переданный элемент из разметки
 * @param {object} element
 */
const removeElement = (element) => {
  element.remove();
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
    return wrapper;
  }
  return wrapper.firstChild;
};

export {renderDOMStrings, createElement, RenderPosition, renderElement, removeElement};
