import FilterMenuView from '../view/filter.js';
import SiteMenuView from '../view/menu.js';
import FilmStatisticView from '../view/statistics.js';
import RankView from '../view/user-rating/create-user-rank.js';
import FilmListView from '../view/films.js';
import FilmSummaryStatisticView from '../view/statistic-summary.js';
import {renderDOMStrings, RenderPosition} from '../view/utils/render.js';
import {countedStatistics} from '../view/statistic/count-statistics.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const statisticsFooter = document.querySelector('.footer__statistics');

export default class Movie {
  constructor(films) {
    this._films = films;
    this._statistic = countedStatistics(this._films);
    this._page = null;
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
    const film = new FilmListView(this._films);
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

  _renderStatisticShort() {
    // statistic in footer
    renderDOMStrings(statisticsFooter, new FilmSummaryStatisticView(this._films).getElement(), RenderPosition.BEFOREEND);
  }

  removePage() {
    this._page = null;
  }
}
