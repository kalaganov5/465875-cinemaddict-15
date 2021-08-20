import {createMenuTemplate, createFilterTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/user-rating/create-user-rank.js';
import {createFilmListTemplate} from './view/films-list.js';
// import {createFilmsTopRatedTemplate, createFilmsMostCommented} from './view/film-card-extra';
import {createFilmStatisticTemplate, createFilmStatisticSummaryTemplate} from './view/statistics.js';
import {renderFilmDetails} from './view/film-datails.js';
import {generateFilms} from './mock/generate-films.js';
import {renderElement} from './view/utils.js';
import {comments} from './mock/generate-comments.js';
import {setUserRank} from './view/user-rating/set-user-rank.js';
import {COUNT_FILM_FOR_LOAD_MORE_BUTTON} from './view/load-more-film/create-show-more-button.js';
import { showMoreHandler } from './view/load-more-film/show-more-handler.js';
import {countedStatistics, statistics} from './view/statistic/count-statistics.js';

// const FILM_COUNT = 5;
// const FILM_PRIORITY_COUNT = 2;
const FILMS_COUNT = 10;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statisticsElement = document.querySelector('.footer__statistics');
const body = document.querySelector('body');
const films = generateFilms(FILMS_COUNT);

console.log(films)

let showMoreButton = null;

countedStatistics();

renderElement(main, createMenuTemplate(films), 'beforeend');

// Страница статистики
renderElement(main, createFilmStatisticTemplate(films), 'beforeend');

renderElement(main, createFilterTemplate(), 'beforeend');

// Установить рейтинг пользователя
renderElement(header, createProfileTemplate(
  setUserRank(statisticsElement.watched),
), 'beforeend');

renderElement(main, createFilmListTemplate(films), 'beforeend');
// renderElement(main, createFilmListTemplate(films, 5), 'beforeend');

const filmList = document.querySelector('.films');
const filmContainer = filmList.querySelector('.films-list__container');

if (films.length > COUNT_FILM_FOR_LOAD_MORE_BUTTON) {
  showMoreButton = document.querySelector('.films-list__show-more');
  showMoreButton.addEventListener ('click', showMoreHandler);
}

// renderElement(filmList, createFilmsTopRatedTemplate(FILM_PRIORITY_COUNT), 'beforeend');
// renderElement(filmList, createFilmsMostCommented(FILM_PRIORITY_COUNT), 'beforeend');
renderElement(statisticsElement, createFilmStatisticSummaryTemplate(films), 'beforeend');

// Поп-ап с описанием фильма
// renderElement(body, renderFilmDetails(films[0], comments), 'beforeend');

// console.log(countedStatistics)

export {body, films, showMoreButton, filmContainer};
