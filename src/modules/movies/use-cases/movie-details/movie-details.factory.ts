import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { MovieDetailsUseCase } from './MovieDetailsUseCase';
import { MovieDetailsController } from './MovieDetailsController';

const moviesProvider = new TmdbMoviesProvider();
const movieDetailsUseCase = new MovieDetailsUseCase(moviesProvider);
const movieDetailsController = new MovieDetailsController(movieDetailsUseCase);

export { movieDetailsController };
