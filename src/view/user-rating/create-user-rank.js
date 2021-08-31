import {createElement} from '../utils.js';
import {setUserRank} from './set-user-rank.js';

/**
 *
 * @returns Создает шаблон разметки профиля пользователя
 */
const createProfileTemplate = (rank) => (
  rank !== null ? `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>` : ''
);

class Rank {
  /**
   *
   * @param {number} watched число просмотренных фильмов
   */
  constructor (watched) {
    this._element = null;
    this._rank = setUserRank(watched);
  }

  getTemplate() {
    return createProfileTemplate(this._rank);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Rank;
