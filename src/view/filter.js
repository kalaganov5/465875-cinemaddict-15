import Abstract from './abstract.js';

/**
 *
 * @returns Создает шаблон разметки фильтра
 */
const createFilterTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
);

export default class FilterMenu extends Abstract {
  getTemplate() {
    return createFilterTemplate();
  }
}
