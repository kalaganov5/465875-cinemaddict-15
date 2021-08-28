import FilterMenuView from './view/filter.js';
import SiteMenuView from './view/menu.js';
import FilmStatisticView from './view/statistics.js';
import RankView from './view/user-rating/create-user-rank.js';
import FilmListView from './view/films.js';
import FilmSummaryStatisticView from './view/statisctic-summary.js';

import {generateFilms} from './mock/generate-films.js';
import {renderDOMStrings, RenderPosition} from './view/utils.js';
import {countedStatistics, statistics} from './view/statistic/count-statistics.js';


const FILMS_COUNT = 9;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statisticsElement = document.querySelector('.footer__statistics');
const body = document.querySelector('body');
const films = generateFilms(FILMS_COUNT);

// Подсчет статистики
countedStatistics(films);

// Установить рейтинг пользователя
const rank = new RankView(statistics.watched);
renderDOMStrings(header, rank.getElement(), RenderPosition.BEFOREEND);

// Рендер меню
const menu = new SiteMenuView(
  statistics.watchlist,
  statistics.watched,
  statistics.favorites,
);
renderDOMStrings(main, menu.getElement(), RenderPosition.BEFOREEND);

// Рендер фильтров
const filter = new FilterMenuView();
renderDOMStrings(main, filter.getElement(), RenderPosition.BEFOREEND);

// Страница статистики
const statisctic = new FilmStatisticView(
  statistics.watched,
  statistics.genre,
  statistics.totalDuration.hour,
  statistics.totalDuration.minutes,
);
renderDOMStrings(main, statisctic.getElement(), RenderPosition.BEFOREEND);

// Рендер фильмов
const film = new FilmListView(films);
renderDOMStrings(main, film.getElement(), RenderPosition.BEFOREEND);
// film.getMoreFilm();
// film.setCardHandler();

// Футер статистика
renderDOMStrings(statisticsElement, new FilmSummaryStatisticView(films).getElement(), RenderPosition.BEFOREEND);

export {body, films};
