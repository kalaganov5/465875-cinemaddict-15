import {spreadHoursMinutesToMinutes, countRepeatedItemInArray, findMaxInObjectElement} from '../utils.js';

/**
 *
 * @returns Вернёт объект с готовой статистикой
 */
const countedStatistics = (films) => {
  let countWatchlist = 0;
  let countHistory = 0;
  let countFavorites = 0;
  let time = 0;
  const genres = [];

  films.forEach((film) => {
    const {isWatchlist, isWatched, isFavorite, duration, genre} = film;
    isWatched ? countHistory++ : false;
    isWatchlist ? countWatchlist++ : false;
    isFavorite ? countFavorites++ : false;
    // Собираем жанры в массив
    genre.forEach((item)=> {
      genres.push(item);
    });

    time+= spreadHoursMinutesToMinutes(duration);
  });

  // Вычисляем топ жанр
  const genresObj = countRepeatedItemInArray(genres);
  const genresTop = findMaxInObjectElement(genresObj);

  return {
    watched: countHistory,
    watchlist: countWatchlist,
    favorites: countFavorites,
    totalDuration: {
      // Перепроверить верность
      hour: Math.floor(time / 60),
      minutes: time % 60,
    },
    genre: genresTop,
  };
};

export {countedStatistics};
