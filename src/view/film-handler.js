import {moviesPresenter} from '../main.js';
import {currentFilm} from './films.js';

const filmHandler = (element, isPopUp) => {
  isPopUp ? element.classList.toggle('film-details__control-button--active') : false;
  if (element.classList.contains('film-card__controls-item--add-to-watchlist') ||
    element.classList.contains('film-details__control-button--watchlist')) {
    // toggle boolean
    currentFilm.isWatchlist = !currentFilm.isWatchlist;
  } else if (element.classList.contains('film-card__controls-item--mark-as-watched') ||
    element.classList.contains('film-details__control-button--watched')) {
    // If watched set today else 'null'
    currentFilm.isWatched ? currentFilm.watchedDate = null : currentFilm.watchedDate = true;
    // toggle boolean
    currentFilm.isWatched = !currentFilm.isWatched;
  } else if (element.classList.contains('film-card__controls-item--favorite') ||
    element.classList.contains('film-details__control-button--favorite')) {
    // toggle boolean
    currentFilm.isFavorite = !currentFilm.isFavorite;
  }
  moviesPresenter.updateFilm = currentFilm;
};

export {filmHandler, currentFilm};
