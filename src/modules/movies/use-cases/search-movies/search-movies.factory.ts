import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { SearchMoviesController } from './SearchMoviesController';
import { SearchMoviesUseCase } from './SearchMoviesUseCase';

const moviesProvider = new TmdbMoviesProvider();
const searchMoviesUseCase = new SearchMoviesUseCase(moviesProvider);
const searchMoviesController = new SearchMoviesController(searchMoviesUseCase);

export { searchMoviesController };
