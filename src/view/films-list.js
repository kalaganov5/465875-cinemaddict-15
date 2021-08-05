import {createFilmCardsTemplate} from './create-film-card.js';
import {createShowMoreTemplate} from './show-more.js';
/**
 *
 * @param {Number} count - Число карточек фильмов
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
      ${createShowMoreTemplate()}
    </section>
  </section>`
);

export {createFilmListTemplate};
