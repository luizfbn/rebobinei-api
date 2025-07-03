import { ListMoviesUseCase } from './ListMoviesUseCase';
import { ListMoviesController } from './ListMoviesController';
import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/TmdbMoviesProvider';

const moviesProvider = new TmdbMoviesProvider();
const listMoviesUseCase = new ListMoviesUseCase(moviesProvider);
const listMoviesController = new ListMoviesController(listMoviesUseCase);

export { listMoviesController };
