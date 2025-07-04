import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { DetailsMovieUseCase } from './DetailsMovieUseCase';
import { DetailsMovieController } from './DetailsMovieController';

const moviesProvider = new TmdbMoviesProvider();
const detailsMovieUseCase = new DetailsMovieUseCase(moviesProvider);
const detailsMovieController = new DetailsMovieController(detailsMovieUseCase);

export { detailsMovieController };
