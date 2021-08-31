import {createFilmCardsTemplate, FILM_STEP} from './create-film-card.js';
import {createShowMoreButtonTemplate} from './load-more-film/create-show-more-button.js';
import {createElement, renderDOMStrings, RenderPosition, renderElement} from './utils.js';
import FilmDetailsView from './film-details.js';
import {comments} from '../mock/generate-comments.js';
import {films, body} from '../main.js';
import {statistics} from './statistic/count-statistics.js';

/**
 *
 * @param {sting} filmId номер фильма строкой
 * @returns объект фильма который нужно показать пользователю
 */
const setCurrentFilm = (filmId) => {
  for(const item of films) {
    if(item._id === +filmId) {
      return item;
    }
  }
};

/**
 * Обработчик нажатий по карточкам фильма, открывает желаемый фильм в pop-up
 */
const filmCardHandler = (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('film-card__poster') ||
    evt.target.classList.contains('film-card__title') ||
    evt.target.classList.contains('film-card__comments')) {
    // Находим и ставим текущий id фильма
    const currentFilmId = evt.target.parentNode.getAttribute('data-film-id');
    // Поп-ап с описанием фильма
    const currentFilm = setCurrentFilm(currentFilmId);
    const filmDetails = new FilmDetailsView(currentFilm, comments);
    renderDOMStrings(body, filmDetails.getElement(), RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  }
};

const setTitleFilmList = () => {
  // временно такое решение
  const activefilters = document.querySelector('.main-navigation__item--active');
  switch(activefilters.textContent) {
    case 'All movies': return 'There are no movies in our database';
    case 'Watchlist': return 'There are no movies to watch now';
    case 'History': return 'There are no watched movies now';
    case 'Favorites': return 'There are no favorite movies now';
  }
};

/**
 *
 * @param {Array} filmsCount Число карточек фильмов
 * @returns возвращает шаблон разметки в контейнере films с карточками фильмов
 */
const createFilmListTemplate = (filmsCount, buttonLoadMore) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${filmsCount}
      </div>
      ${buttonLoadMore}
    </section>
  </section>`
);

class FilmList {
  /**
   *
   * @param {array} filmData массив с фильмами
   */
  constructor(filmData) {
    this._element = null;
    this._films = filmData;
    this._loadMoreButton = null;
    this._filmContainer = null;
    this._cardElement = null;
  }

  getTemplate() {
    const cards = createFilmCardsTemplate(this._films);
    const loadMore = this._films.length > FILM_STEP ?
      createShowMoreButtonTemplate(): '';
    this._element = createFilmListTemplate(cards, loadMore);

    return this._element;
  }

  getMoreFilm() {
    this._filmContainer = this._element.querySelector('.films-list__container');
    if(this._films.length > FILM_STEP) {
      this._loadMoreButton = this._element.querySelector('.films-list__show-more');
      this._loadMoreButton.addEventListener ('click', (evt) => {
        evt.preventDefault();
        renderElement(this._filmContainer, createFilmCardsTemplate(this._films, this._loadMoreButton), RenderPosition.BEFOREEND);
      });
    }
  }

  setCardHandler() {
    this._filmContainer.addEventListener('click', filmCardHandler);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    this.getMoreFilm();
    this.setCardHandler();
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
export default FilmList;
