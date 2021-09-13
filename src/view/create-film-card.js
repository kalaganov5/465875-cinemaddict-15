import {cropText, getDeclension} from './utils.js';
import {removeElement} from './utils/render.js';

const FILM_STEP = 5;

const cardTemplate = (_id,
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
  isFavorite) => (`<article class="film-card" data-film-id="${_id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.format('YYYY')}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cropText(description)}</p>
      <a class="film-card__comments">${commentIds.length} ${getDeclension(commentIds.length, ['comment','comments', 'comments'])}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`);

class CreateFilmCards {
  /**
 * @films - массив с фильмами
 * Генерирует необходимое количество карточек фильмов
 */
  constructor(films, showMoreButton = null) {
    this._films = films;
    this._showMoreButton = showMoreButton;
    this._filmCards = '';
    this._numberClickLoadMore = 1;
  }

  createCards(number) {
    number ? this._numberClickLoadMore = number : false;
    const startIndex = (FILM_STEP * this._numberClickLoadMore) - FILM_STEP;
    const endIndex = startIndex + FILM_STEP;
    for (let i = startIndex; i < endIndex; i++) {
      // console.log(this._films[i], i);
      // Если в массиве закончились данные
      if (this._films[i] === undefined) {
        // Если кнопки уже не существует
        this._showMoreButton !== null && this._showMoreButton !== undefined ? removeElement(this._showMoreButton): '';
        break;
      }
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
      } =  this._films[i];
      // Зашиваю id фильма для того чтобы в будущем попробовать реализовать
      // генерацию и рендер pop-up фильма по отслеживанию нажатия ID
      this._filmCards += cardTemplate(_id,
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
      if (this._films.length - 1 === i && this._showMoreButton !== null && this._showMoreButton !== undefined) {
        removeElement(this._showMoreButton);
      }
    }
    return this._filmCards;
  }
}

export {cardTemplate, FILM_STEP};
export default CreateFilmCards;
