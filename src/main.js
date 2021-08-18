import {createMenuTemplate, createFilterTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/user-rating/create-user-rank.js';
import {createFilmListTemplate} from './view/films-list.js';
import {createFilmsTopRatedTemplate, createFilmsMostCommented} from './view/film-card-extra';
import {createFilmStatisticTemplate, createFilmStatisticSummaryTemplate} from './view/statistics.js';
import {renderFilmDetails} from './view/film-datails.js';
import {generateFilms} from './mock/generate-films.js';
import {renderElement} from './view/utils.js';
import {comments} from './mock/generate-comments.js';
import {setUserRank} from './view/user-rating/set-user-rank.js';
import {COUNT_FILM_FOR_LOAD_MORE_BUTTON} from './view/load-more-film/create-show-more-button.js';

// const FILM_COUNT = 5;
const FILM_PRIORITY_COUNT = 2;
const FILMS_COUNT = 15;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statistics = document.querySelector('.footer__statistics');
const body = document.querySelector('body');
const films = generateFilms(FILMS_COUNT);

renderElement(main, createMenuTemplate(films), 'beforeend');

// Страница статистики
renderElement(main, createFilmStatisticTemplate(films), 'beforeend');

renderElement(main, createFilterTemplate(), 'beforeend');

// Установить рейтинг пользователя
renderElement(header, createProfileTemplate(
  setUserRank(films),
), 'beforeend');

renderElement(main, createFilmListTemplate(films), 'beforeend');

const filmList = document.querySelector('.films');

let showMoreButton = null;

if (films.length > COUNT_FILM_FOR_LOAD_MORE_BUTTON) {
  showMoreButton = document.querySelector('.films-list__show-more');
  showMoreButton.addEventListener ('click', (evt) => {
    evt.preventDefault();
    console.log('click load more');
  });
}

renderElement(filmList, createFilmsTopRatedTemplate(FILM_PRIORITY_COUNT), 'beforeend');
renderElement(filmList, createFilmsMostCommented(FILM_PRIORITY_COUNT), 'beforeend');
renderElement(statistics, createFilmStatisticSummaryTemplate(films), 'beforeend');

// Поп-ап с описанием фильма
// renderElement(body, renderFilmDetails(films[0], comments), 'beforeend');

export {body, films, showMoreButton};
