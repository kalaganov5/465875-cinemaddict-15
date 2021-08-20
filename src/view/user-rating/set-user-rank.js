/*
0 — блок со званием не отображается;
от 1 до 10 — novice;
от 11 до 20 — fan;
от 21 и выше — movie buff.
*/

/**
 * Установит ранк в зависимости от просмотренных фильмов
 */
const setUserRank = (countWatched) => {
  if (countWatched > 0 && countWatched <= 10) {
    // от 1 до 10 — novice;
    return 'Novice';
  } else if (countWatched >= 11 && countWatched <= 20) {
    // от 11 до 20 — fan;
    return 'Fan';
  } else if (countWatched >= 21) {
    // от 21 и выше — movie buff.
    return 'Movie Buff';
  } else {
    // 0 — блок со званием не отображается;
    return null;
  }
};

export {setUserRank};
