import Abstract from './abstract.js';
/**
 *
 * @returns Создает шаблон разметки меню
 */
const createMenuTemplate = (countWatchlist, countWatched, countFavorites) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

class SiteMenu extends Abstract{
  constructor(coutWatchlist, countWatched, countFavorites) {
    super();
    this._countWatchlist = coutWatchlist;
    this._countWatched = countWatched;
    this._countFavorites = countFavorites;
  }

  getTemplate() {
    return createMenuTemplate(this._countWatchlist, this._countWatched, this._countFavorites);
  }
}

export default SiteMenu;


