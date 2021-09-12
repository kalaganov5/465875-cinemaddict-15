import Abstract from './abstract.js';
/**
 *
 * @returns Создает шаблон разметки меню
 */
const createMenuTemplate = (countWatchlist, countWatched, countFavorites) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count main-navigation__item-count--watchlist">${countWatchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count main-navigation__item-count--history">${countWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count main-navigation__item-count--favorites">${countFavorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

class SiteMenu extends Abstract{
  constructor(countWatchlist, countWatched, countFavorites) {
    super();
    this._countWatchlist = countWatchlist;
    this._countWatched = countWatched;
    this._countFavorites = countFavorites;
  }

  getTemplate() {
    return createMenuTemplate(this._countWatchlist, this._countWatched, this._countFavorites);
  }
}

export default SiteMenu;
export {createMenuTemplate};


