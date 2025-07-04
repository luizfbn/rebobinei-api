import { MovieMapper } from '../../movie.mapper';
import { IMoviesProvider } from '../../providers/movies.provider.interface';
import { DetailsMovieInputDTO } from './details-movie.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class DetailsMovieUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(dto: DetailsMovieInputDTO) {
		const movie = await this.moviesProvider.getDetailsById(dto);

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		return MovieMapper.toDetailsDTO(movie);
	}
}
