import Abstract from '../abstract.js';
import {setUserRank} from './set-user-rank.js';

/**
 *
 * @returns Создает шаблон разметки профиля пользователя
 */
const createProfileTemplate = (rank) => (
  rank !== null ? `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>` : '<section class="header__profile profile visually-hidden"></section>'
);

class Rank extends Abstract {
  /**
   *
   * @param {number} watched число просмотренных фильмов
   */
  constructor (watched) {
    super();
    this._rank = setUserRank(watched);
  }

  getTemplate() {
    return createProfileTemplate(this._rank);
  }
}

export default Rank;
