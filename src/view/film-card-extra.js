import {createFilmCardsTemplate} from './create-film-card.js';

/**
 *
 * @param {Number} count - Число карточек фильмов
 * @returns - возвращает шаблон разметки в контейнере films с карточками фильмов
 */

const createFilmsTopRatedTemplate = (count) => {
  const filmCards = createFilmCardsTemplate(count);
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
        ${filmCards}
      </div>
    </section>`;
};

/**
 *
 * @param {Number} count - Число карточек фильмов
 * @returns - возвращает шаблон разметки в контейнере films с карточками фильмов
 */

const createFilmsMostCommented = (count) => {
  const filmCards = createFilmCardsTemplate(count);
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
        ${filmCards}
      </div>
    </section>`;
};

export {createFilmsTopRatedTemplate, createFilmsMostCommented};
