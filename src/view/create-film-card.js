import {cropText, getDeclension} from './utils.js';

/**
 * @filmArray - массив с фильмами
 * @renderedFilms
 * @returns Генерирует необходимое количество карточек фильмов
 */
const createFilmCardsTemplate = (filmArray, renderedFilms) => {
  let filmCards = '';
  for (let i = 0; i < filmArray.length; i++) {

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
    } =  filmArray[i];

    // Зашиваю id фильма для того чтобы в будущем попробовать реализовать
    // генерацию и рендер ПОПАП фильма по отслеживанию нажатия ID
    filmCards += `<article class="film-card" data-film-id="${_id}">
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
  </article>`;
  }
  return filmCards;
};

export {createFilmCardsTemplate};
