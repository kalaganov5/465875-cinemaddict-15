import MoviePresenter from './presenter/movie.js';

// Mock
import {generateFilms} from './mock/generate-films.js';
import {comments} from './mock/generate-comments.js';
const FILMS_COUNT = 23;
const films = generateFilms(FILMS_COUNT);
// Mock

const body = document.querySelector('body');
const moviesPresenter = new MoviePresenter(films, comments);

moviesPresenter.init();
export {body, films, moviesPresenter};
