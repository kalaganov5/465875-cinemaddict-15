import {createMenuTemplate, createFilterTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/user-rank.js';
import {createFilmListTemplate} from './view/films-list.js';
import {createFilmsTopRatedTemplate, createFilmsMostCommented} from './view/film-card-extra';
import {createFilmStatisticTemplate, createFilmStatisticSummaryTemplate} from './view/statistics.js';
import {createFilmDetailsTemplate} from './view/film-datails.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statistics = document.querySelector('.footer__statistics');
const body = document.querySelector('body');


/**
 * Функция занимается отрисовкой элемента
 * @param {*} container - контейнер в который вставляем элемент
 * @param {*} layout - готовая разметка
 * @param {*} place - позиция добавляемого элемента относительно container (контейнера), может быть: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
 */
const renderElement = (container, layout, place) => {
  container.insertAdjacentHTML(place, layout);
};

renderElement(main, createMenuTemplate(), 'beforeend');

// Страница статистики
renderElement(main, createFilmStatisticTemplate(), 'beforeend');

renderElement(main, createFilterTemplate(), 'beforeend');
renderElement(header, createProfileTemplate(), 'beforeend');
renderElement(main, createFilmListTemplate(5), 'beforeend');

const films = document.querySelector('.films');
renderElement(films, createFilmsTopRatedTemplate(2), 'beforeend');
renderElement(films, createFilmsMostCommented(2), 'beforeend');
renderElement(statistics, createFilmStatisticSummaryTemplate(), 'beforeend');

// Поп-ап с описанием фильма
renderElement(body, createFilmDetailsTemplate(), 'beforeend');

export {body};
