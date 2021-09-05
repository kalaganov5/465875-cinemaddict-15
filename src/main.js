import MoviePresenter from './presenter/movie.js';

// Mock
import {generateFilms} from './mock/generate-films.js';
const FILMS_COUNT = 11;
const films = generateFilms(FILMS_COUNT);
// Mock

const body = document.querySelector('body');
const moviesPresenter = new MoviePresenter(films);

moviesPresenter.init();

export {body, films};
