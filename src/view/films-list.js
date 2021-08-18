import {createFilmCardsTemplate} from './create-film-card.js';
import {COUNT_FILM_FOR_LOAD_MORE_BUTTON, createShowMoreButtonTemplate} from './load-more-film/create-show-more-button.js';

/**
 *
 * @param {Array} count - Число карточек фильмов
 * @returns - возвращает шаблон разметки в контейнере films с карточками фильмов
 */
const createFilmListTemplate = (count) => (
  `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${createFilmCardsTemplate(count)}
      </div>
      ${count.length > COUNT_FILM_FOR_LOAD_MORE_BUTTON ? createShowMoreButtonTemplate(): ''}
    </section>
  </section>`
);

export {createFilmListTemplate};
