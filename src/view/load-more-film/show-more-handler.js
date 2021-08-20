import {filmContainer} from '../../main.js';
import { renderElement } from '../utils.js';
import { films } from '../../main.js';
import { createFilmCardsTemplate } from '../create-film-card.js';

const showMoreHandler = (evt) => {
  evt.preventDefault();
  const markup = createFilmCardsTemplate(films);
  renderElement(filmContainer, markup);
};

export {showMoreHandler};
