import Abstract from './abstract.js';
import {FILM_STEP} from './create-film-card.js';
import CreateFilmCardsView from './create-film-card.js';
import {renderDOMStrings, RenderPosition, renderElement} from './utils/render.js';
import FilmDetailsView from './film-details.js';
import {body} from '../main.js';
import {filmHandler} from './film-handler.js';


// Чтобы не прокидывать фильмы несколько раз используем замыкание
let films;
// Чтобы не прокидывать комментарии несколько раз используем замыкание
let comments;
// Текущий обрабатываемый фильм
let currentFilm;

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
 *
 * @returns Создается кнопка загрузить ещё
 */
const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

/**
 * Обработчик нажатий по карточкам фильма, открывает желаемый фильм в pop-up
 */
const filmCardHandler = (evt) => {
  evt.preventDefault();
  // Находим и ставим текущий id фильма
  const filmId = evt.target.parentNode.getAttribute('data-film-id') !== null ?
    evt.target.parentNode.getAttribute('data-film-id') : evt.target.parentNode.parentNode.getAttribute('data-film-id');
  // Поп-ап с описанием фильма
  currentFilm = setCurrentFilm(filmId);

  if (evt.target.classList.contains('film-card__poster') ||
    evt.target.classList.contains('film-card__title') ||
    evt.target.classList.contains('film-card__comments')) {
    const filmDetails = new FilmDetailsView(currentFilm, comments);
    renderDOMStrings(body, filmDetails.getElement(), RenderPosition.BEFOREEND);
    // Ставим обработчик закрытия pop-up
    filmDetails.setCardHandler();
    body.classList.add('hide-overflow');
  } else if (evt.target.classList.contains('film-card__controls-item')) {
    // Пробрасываем элемент из кнопок
    filmHandler(evt.target, false);
  }
};

// Временно
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
        ${filmsCount.length > 0 ? filmsCount : 'There are no movies in our database'}
      </div>
      ${buttonLoadMore}
    </section>
  </section>`
);

class FilmList extends Abstract {
  /**
   *
   * @param {array} filmData массив с фильмами
   */
  constructor(filmData, commentData) {
    super();
    this._films = filmData;
    // В переменную films прокидываем реальные данные
    films = filmData;
    this._loadMoreButton = null;
    this._filmContainer = null;
    this._cardElement = null;
    this._comments = commentData;
    // В переменную comments прокидываем реальные данные
    comments = this._comments;
  }

  getTemplate() {
    const cards = new CreateFilmCardsView(this._films);
    const loadMore = this._films.length > FILM_STEP ?
      createShowMoreButtonTemplate(): '';
    this._element = createFilmListTemplate(cards.createCards(), loadMore);
    return this._element;
  }

  getMoreFilm(currentFilms = this._films) {
    let count = 1;
    this._filmContainer = this._element.querySelector('.films-list__container');
    if(currentFilms.length > FILM_STEP) {
      this._loadMoreButton = this._element.querySelector('.films-list__show-more');
      this._loadMoreButton.addEventListener ('click', (evt) => {
        evt.preventDefault();
        const moreElements = new CreateFilmCardsView(currentFilms, this._loadMoreButton).createCards(++count);
        renderElement(this._filmContainer, moreElements, RenderPosition.BEFOREEND);
      });
    }
  }

  setCardHandler() {
    this._filmContainer.addEventListener('click', filmCardHandler);
  }
}
export default FilmList;
export {currentFilm};
