import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { ListMoviesUseCase } from './ListMoviesUseCase';
import { ListMoviesController } from './ListMoviesController';

const moviesProvider = new TmdbMoviesProvider();
const listMoviesUseCase = new ListMoviesUseCase(moviesProvider);
const listMoviesController = new ListMoviesController(listMoviesUseCase);

export { listMoviesController };
