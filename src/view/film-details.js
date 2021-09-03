import {body} from '../main.js';
import {getDeclension} from './utils.js';
import {removeElement} from './utils/render.js';
import {renderComments} from './render-comments.js';
import Abstract from './abstract.js';

/**
 *
 * @param {array} genres - генерация разметки из массива жанров
 * @returns готовая разметка жанров для вставки
 */
const generateGenre = (genres) => {
  let genreElements = '';
  genres.forEach((element)=> {
    genreElements += `<span class="film-details__genre">${element}</span>`;
  });
  return genreElements;
};

const createFilmTemplate = (filmDetails, comments) => {
  const {
    title,
    originalTitle,
    director,
    writers,
    actors,
    country,
    rating,
    ageRating,
    releaseDate,
    duration,
    genre,
    poster,
    description,
    commentIds,
    isWatchlist,
    isWatched,
    isFavorite,
  } = filmDetails;
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate.format('D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${generateGenre(genre)}
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isWatchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            ${getDeclension(commentIds.length, ['Comment','Comments', 'Comments'])}
            <span class="film-details__comments-count">
              ${commentIds.length}
            </span>
          </h3>
          <ul class="film-details__comments-list">
            ${renderComments(comments, commentIds)}
          </ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

class FilmDetails extends Abstract {
  constructor(filmDetails, comments) {
    super();
    this._filmDetails = filmDetails;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmTemplate(this._filmDetails, this._comments);
  }

  setCardHandler() {
    /**
     * Закрывает и удаляет popup из разметки
     */
    const closePopUp = () => {
      removeElement(this._element);
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', escapeDownHandler);
    };
    // handler по крестику
    this._element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if(evt.target.classList.contains('film-details__close-btn')) {
        closePopUp();
      }
    });
    // handler по клавише Escape
    // используем function declaration намеренно
    // чтобы избежать ошибок linter
    function escapeDownHandler(evt) {
      if(evt.key === 'Escape') {
        closePopUp();
      }
    }
    document.addEventListener('keydown', escapeDownHandler);
  }
}

export default FilmDetails;
