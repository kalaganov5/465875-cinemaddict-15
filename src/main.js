import {createMenuTemplate, createFilterTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/user-rank.js';
import {createFilmListTemplate} from './view/films-list.js';
import {createFilmsTopRatedTemplate, createFilmsMostCommented} from './view/film-card-extra';
import {createFilmStatisticTemplate, createFilmStatisticSummaryTemplate} from './view/statistics.js';
import {createFilmDetailsTemplate} from './view/film-datails.js';

// temp
import './mock/generate-comments.js';


const FILM_COUNT = 5;
const FILM_PRIORITY_COUNT = 2;
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
renderElement(main, createFilmListTemplate(FILM_COUNT), 'beforeend');

const films = document.querySelector('.films');
renderElement(films, createFilmsTopRatedTemplate(FILM_PRIORITY_COUNT), 'beforeend');
renderElement(films, createFilmsMostCommented(FILM_PRIORITY_COUNT), 'beforeend');
renderElement(statistics, createFilmStatisticSummaryTemplate(), 'beforeend');

// Поп-ап с описанием фильма
renderElement(body, createFilmDetailsTemplate(), 'beforeend');

export {body};
