import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { MovieListUseCase } from './MovieListUseCase';
import { MovieListController } from './MovieListController';

const moviesProvider = new TmdbMoviesProvider();
const movieListUseCase = new MovieListUseCase(moviesProvider);
const movieListController = new MovieListController(movieListUseCase);

export { movieListController };
