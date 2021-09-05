import dayjs from 'dayjs';
import {getRandomUniqueNumber, getRandomInteger, getRandomElement} from './utils.js';

const COMMENTS_COUNT = 100;

const REACTION = [
  {
    text: 'Smile',
    imageUrl: 'smile.png',
  },
  {
    text: 'Sleeping',
    imageUrl: 'sleeping.png',
  },
  {
    text: 'Puke',
    imageUrl: 'puke.png',
  },
  {
    text: 'Angry',
    imageUrl: 'angry.png',
  },
];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];


const AUTHOR_COMMENT = [
  'Tim Macoveev',
  'John Doe',
  'Paulina Mcdonald',
  'Camila Silva',
  'Jonah Branch',
];

/**
 *
 * @returns вернёт случайную дату и время
 */
const generateCommentDatePublication = () => (
  dayjs()
    .subtract(getRandomInteger(1, 178), 'day')
    .subtract(getRandomInteger(1, 12), 'hour')
);

const commentsId = [];

/**
 *
 * @param {object} reaction - объект с адресом картинкой и подписью для alt реакции
 * @returns - возвращает объект комментария
 */
const commentObj = () => {
  const reaction = getRandomElement(REACTION);
  return {
    _id: getRandomUniqueNumber(commentsId),
    reaction: {
      emoji: `./images/emoji/${reaction.imageUrl}`,
      shortReview: reaction.text,
    },
    comment: getRandomElement(COMMENTS),
    author: getRandomElement(AUTHOR_COMMENT),
    // Дата комментария отображается в формате год/месяц/день часы:минуты (например «2019/12/31 23:59»).
    datePublication: generateCommentDatePublication().format('YYYY/MM/DD HH:mm'),
  };
};

/**
 *
 * @param {number} count число объектов комментариев
 * @returns массив с комментариями
 */
const generateComments = (count) => (
  new Array(count).fill(null).map(commentObj)
);

const comments = generateComments(COMMENTS_COUNT);

export {commentsId, comments};
