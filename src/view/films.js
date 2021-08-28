import {createFilmCardsTemplate, FILM_STEP} from './create-film-card.js';
import {createShowMoreButtonTemplate} from './load-more-film/create-show-more-button.js';
import {createElement, renderDOMStrings, RenderPosition, renderElement} from './utils.js';
import FilmDetailsView from './film-datails.js';
import {comments} from '../mock/generate-comments.js';
import {films, body} from '../main.js';

// Найдите обложку фильма,
// заголовок и элемент с количеством комментариев в компоненте карточки фильма
const filmCardHandler = (evt) => {
  evt.preventDefault();
  console.log(evt.target.classList)
  if (evt.target.classList.contains('film-card__poster') ||
    evt.target.classList.contains('film-card__title') ||
    evt.target.classList.contains('film-card__comments')) {

    // Поп-ап с описанием фильма
    const filmDetails = new FilmDetailsView(films[0], comments);
    renderDOMStrings(body, filmDetails.getElement(), RenderPosition.BEFOREEND);
  }
};

/**
 *
 * @param {Array} films Число карточек фильмов
 * @returns возвращает шаблон разметки в контейнере films с карточками фильмов
 */
const createFilmListTemplate = (films, buttonLoadMore) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        ${films}
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
    this._filmContainer.addEventListener('click', filmCardHandler, true);
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
