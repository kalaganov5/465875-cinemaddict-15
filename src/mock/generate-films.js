import {getRandomElement, getRandomElements, getRandomInteger, getRandomUniqueNumber} from './utils.js';
import {commentsId} from './generate-comments.js';
import dayjs from 'dayjs';

const FILMS = [
  'Central London',
  'Extra',
  'Living English',
  'The Jungle Book',
  'Cast Away',
  'Bridget Jones’s Diary',
  'Forrest Gump',
  'Jean-Paul Marat förföljd och mördad så som det framställs av patienterna på hospitalet Charenton under ledning av herr de Sade',
];

const POSTERS = [
  'the-man-with-the-golden-arm.jpg',
  'the-great-flamarion.jpg',
  'the-dance-of-life.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'sagebrush-trail.jpg',
  'popeye-meets-sinbad.png',
  'made-for-each-other.png',
];

const FILM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc lorem, fermentum tincidunt tortor id, faucibus suscipit tortor. Nullam hendrerit lectus eget elit feugiat imperdiet. Sed condimentum quis risus a dictum. Quisque id bibendum libero. Donec luctus tristique efficitur. Quisque bibendum, mauris vitae luctus auctor, augue nulla fringilla metus, in molestie nisl leo et nibh. Vestibulum eros elit, condimentum sit amet feugiat scelerisque, ultricies quis neque. Aliquam elementum massa massa, a sodales ex efficitur vitae. Nulla tempor quam ligula, non ultrices nulla finibus in. Curabitur sed est porta, cursus mi eget, tincidunt tortor. Nunc eu tincidunt magna.',
  'non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex',
  'convallis sed finibus eget',
  'eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const DIRECTORS = [
  'Anthony Mann',
  'Tom Ford',
];

const WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];

const ACTORS = [
  'Alan Rickman ',
  'Benedict Cumberbatch',
  'Benicio del Toro',
  'Vincent Cassel ',
  'Viggo Mortensen',
  'James McAvoy ',
  'Jake Gyllenhaal',
  'Daniel Day-Lewis',
  'Daniel Radcliffe',
  'Leonardo DiCaprio',
];

const COUNTRY = [
  'USA',
  'CANADA',
  'INDIA',
];

const AGE_RATING = [
  '0',
  '12',
  '18',
];

const GENRE = [
  'Drama',
  'Film-Noir',
  'Mystery',
  'Action ',
];

const generateReleseDate = () => (
  dayjs()
    .subtract(getRandomInteger(200, 1000), 'day')
    .subtract(getRandomInteger(1, 12), 'hour')
    // .format('D MMMM YYYY')
);

/**
 *
 * @param {array} arrayId массив с id комментариев
 * @returns вернут новый массив с уникальными id комментариев
 */
const getUniqueComment = (arrayId) => {
  // Рандомное число комментариев
  const count = getRandomInteger(1, 5);
  const ids = [];
  for (let i = 0; i < count; i++) {
    // Получаем рандомные элемент
    const randomElement = getRandomElement(arrayId);
    // Добавляем этот элемент в наш массив
    ids.push(randomElement);
    // Удаляем элемент из прошлого массива
    arrayId.splice(arrayId.indexOf(randomElement), 1);
  }
  return ids;
};

/**
 *
 * @param {number} durationMinutes минуты
 * @returns конвертирует минуты в формат "ЧАСЫ МИНУТЫ"
 */
const convertTime = (durationMinutes) => {
  const hours = Math.trunc(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
};

const filmsId = [];

/**
 *
 * @returns генерирует объект фильма
 */
const generateFilm = () => ({
  _id: getRandomUniqueNumber(filmsId),
  title: getRandomElement(FILMS),
  originalTitle: `Original: ${getRandomElement(FILMS)}`,
  director: getRandomElement(DIRECTORS),
  writers: getRandomElements(WRITERS),
  actors: getRandomElements(ACTORS),
  country: getRandomElement(COUNTRY),
  poster: `images/posters/${getRandomElement(POSTERS)}`,
  // Короткое описание, будет отображаться урезнанным
  description: getRandomElement(FILM_DESCRIPTIONS),
  commentIds: getUniqueComment(commentsId),
  rating: `${getRandomInteger(0, 9)}.${getRandomInteger(1, 9)}`,
  ageRating: getRandomElement(AGE_RATING),
  releaseDate: generateReleseDate(),
  duration: convertTime(getRandomInteger(59, 61)),
  genre: getRandomElements(GENRE),
  isFavorite: Boolean(getRandomInteger(0, 1) === 1),
  isWatched: Boolean(getRandomInteger(0, 1) === 1),
  // Нужна функция которая если фильм просмотрен то должна быть дата
  get wathedDate() {
    return this.isWatched ? generateReleseDate(): null;
  },
  set wathedDate(value) {
    this.value;
  },
  isWatchlist: Boolean(getRandomInteger(0, 1) === 1),
});


/**
 *
 * @param {number} count число объектов фильмов
 * @returns массив с объектами о фильмах
 */
const generateFilms = (count) => (
  new Array(count).fill(null).map(generateFilm)
);

export {generateFilm, generateFilms};
