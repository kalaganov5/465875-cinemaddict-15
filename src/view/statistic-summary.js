import {createElement} from './utils.js';

class FilmSummaryStatistic {
  /**
   * @films - массив с фильмами
   */
  constructor (films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return `<p>${this._films.length} movies inside</p>`;
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

export default FilmSummaryStatistic;
