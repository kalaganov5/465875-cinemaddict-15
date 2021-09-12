import FilterMenuView from '../view/filter.js';
import SiteMenuView from '../view/menu.js';
import FilmStatisticView from '../view/statistics.js';
import RankView from '../view/user-rating/create-user-rank.js';
import FilmListView from '../view/films.js';
import FilmSummaryStatisticView from '../view/statistic-summary.js';
import {renderDOMStrings, RenderPosition} from '../view/utils/render.js';
import {countedStatistics} from '../view/statistic/count-statistics.js';
import {cardTemplate} from '../view/create-film-card.js';
import {createElement} from '../view/utils/render.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statisticsFooter = document.querySelector('.footer__statistics');

export default class Movie {
  /**
   *
   * @param {array} films массив с фильмами
   * @param {array} comments массив комментариев
   */
  constructor(films, comments) {
    this._films = films;
    this._statistic = countedStatistics(this._films);
    this._comments = comments;
    this._page = null;
    this._film = null;
  }

  init() {
    // Render rank user
    this._renderRank();
    // Render menu
    this._renderMenu();
    // Current page
    this._page = this.showMoviePage();
    // Render footer statistic
    this._renderStatisticShort();
  }

  _renderRank() {
    // Установит рейтинг пользователя
    const rank = new RankView(this._statistic.watched);
    renderDOMStrings(header, rank.getElement(), RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    const menu = new SiteMenuView(
      this._statistic.watchlist,
      this._statistic.watched,
      this._statistic.favorites,
    );
    renderDOMStrings(main, menu.getElement(), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    // Render filters
    const filter = new FilterMenuView();
    renderDOMStrings(main, filter.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilms() {
    const film = new FilmListView(this._films, this._comments);
    renderDOMStrings(main, film.getElement(), RenderPosition.BEFOREEND);
    // set handler and load more button
    film.getMoreFilm();
    film.setCardHandler();
  }

  showMoviePage() {
    // Render films and Sort
    this._renderSort();
    this._renderFilms();
  }

  showStatisticsPage() {
    // Отрисовка страницы статистики
    const statistic = new FilmStatisticView(
      this._statistic.watched,
      this._statistic.genre,
      this._statistic.totalDuration.hour,
      this._statistic.totalDuration.minutes,
    );
    renderDOMStrings(main, statistic.getElement(), RenderPosition.BEFOREEND);
  }

  get updateFilm() {
    return this._film;
  }

  set updateFilm(filmProcessed) {
    this._film = filmProcessed;
    // Найти фильм в массиве
    for(let i = 0; i < this._films.length; i++) {
      // Вариант: пройтись по ключам объекта и найти что заменяет
      if(this._films[i]._id === this._film._id) {
        this._films.splice(i, 1, this._film);
        // запуск процесса обновления фильма
        this.updateHtml();
        break;
      }
    }
  }

  updateHtml() {
    const currentFilmForUpdate = document.querySelector(`[data-film-id="${this._film._id}"]`);
    const {
      _id,
      title,
      rating,
      releaseDate,
      duration,
      genre,
      poster,
      description,
      commentIds,
      isWatchlist,
      isWatched,
      isFavorite,
    } =  this._film;
    const newFilmElement = cardTemplate(_id,
      title,
      rating,
      releaseDate,
      duration,
      genre,
      poster,
      description,
      commentIds,
      isWatchlist,
      isWatched,
      isFavorite);
    const currentFilmElementToHTML = createElement(newFilmElement);
    currentFilmForUpdate.innerHTML = currentFilmElementToHTML.innerHTML;
    // Обновляем меню
    this._updateMenu();
  }

  _updateMenu() {
    // Обновляем статистику
    this._statistic = countedStatistics(this._films);
    const menuElement = document.querySelector('.main-navigation');
    // watchlist
    const watchlistElement = menuElement.querySelector('.main-navigation__item-count--watchlist');
    watchlistElement.textContent = this._statistic.watchlist;
    // history
    const historyElement = menuElement.querySelector('.main-navigation__item-count--history');
    historyElement.textContent = this._statistic.watched;
    // history
    const favoritesElement = menuElement.querySelector('.main-navigation__item-count--favorites');
    favoritesElement.textContent = this._statistic.favorites;
  }

  _renderStatisticShort() {
    // statistic in footer
    renderDOMStrings(statisticsFooter, new FilmSummaryStatisticView(this._films).getElement(), RenderPosition.BEFOREEND);
  }

  removePage() {
    this._page = null;
  }
}
