import Abstract from './abstract.js';

class FilmSummaryStatistic extends Abstract {
  /**
   * @films - массив с фильмами
   */
  constructor (films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return `<p>${this._films.length} movies inside</p>`;
  }
}

export default FilmSummaryStatistic;
