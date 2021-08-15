import dayjs from 'dayjs';
import {getRandomUniqueNumber, getRandomInteger} from '../mock/utils.js';

/**
 *
 * @returns случайный объект с адресом картинки и подписью для alt реакции
 */
const generateReaction = () => {
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

  const randomIndex = getRandomInteger(0, REACTION.length - 1);

  return REACTION[randomIndex];
};

/**
 *
 * @returns вернёт случайный комментарий
 */
const generateComment = () => {
  const COMMENTS = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];
  const randomIndex = getRandomInteger(0, COMMENTS.length - 1);

  return COMMENTS[randomIndex];
};

/**
 *
 * @returns вернет случайного автора
 */
const generateAuthor = () => {
  const AUTHOR_COMMENT = [
    'Tim Macoveev',
    'John Doe',
    'Paulina Mcdonald',
    'Camila Silva',
    'Jonah Branch',
  ];

  const randomIndex = getRandomInteger(0, AUTHOR_COMMENT.length - 1);

  return AUTHOR_COMMENT[randomIndex];
};

/**
 *
 * @returns вернёт случайную дату и время
 */
const generateCommentDatePublication = () => (
  dayjs()
    .subtract(getRandomInteger(1, 178), 'day')
    .subtract(getRandomInteger(1, 24), 'hour')
    .format('YYYY/MM/DD HH:mm')
);

const commentsId = [];
/**
 *
 * @param {object} reaction - объект с адресом картинкой и подписью для alt реакции
 * @returns - возвращает объект комментария
 */
const commentObj = (reaction = generateReaction()) => ({
  id: getRandomUniqueNumber(commentsId),
  reaction: {
    emoji: reaction.text,
    shortReview: reaction.imageUrl,
  },
  comment: generateComment(),
  author: generateAuthor(),
  // Дата комментария отображается в формате год/месяц/день часы:минуты (например «2019/12/31 23:59»).
  datePublication: generateCommentDatePublication(),
});

export {commentObj};
