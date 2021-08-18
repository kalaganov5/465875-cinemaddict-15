/**
 *
 * @returns Создает шаблон разметки меню
 */
const createMenuTemplate = (films) => {
  let countWatchlist = 0;
  let countHistory = 0;
  let countFavorites = 0;

  // В будущем подумать над опитимизацией, т.к. запускаю проход по массиву
  // films уже не первый раз для подсчета данных
  films.forEach(film => {
    const {isWatchlist, isWatched, isFavorite} = film;
    if (isWatchlist) {
      countWatchlist++;
    } else if (isWatched) {
      countHistory++;
    } else if (isFavorite) {
      countFavorites++;
    }
  });

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countHistory}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
};

/**
 *
 * @returns Создает шаблон разметки фильтра
 */
const createFilterTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

export {createMenuTemplate, createFilterTemplate};
