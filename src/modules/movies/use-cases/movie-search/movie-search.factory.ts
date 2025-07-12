import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { MovieSearchController } from './MovieSearchController';
import { MovieSearchUseCase } from './MovieSearchUseCase';

const moviesProvider = new TmdbMoviesProvider();
const movieSearchUseCase = new MovieSearchUseCase(moviesProvider);
const movieSearchController = new MovieSearchController(movieSearchUseCase);

export { movieSearchController };
