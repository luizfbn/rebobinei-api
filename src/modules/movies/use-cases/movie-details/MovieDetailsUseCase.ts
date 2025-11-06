import { MovieMapper } from '../../movie.mapper';
import { MoviesProvider } from '../../providers/movies.provider.interface';
import { MovieDetailsInputDTO } from './movie-details.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class MovieDetailsUseCase {
	constructor(private moviesProvider: MoviesProvider) {}

	async execute({ id }: MovieDetailsInputDTO) {
		const movie = await this.moviesProvider.getDetailsById({
			id,
			language: process.env.LOCALE ?? 'en-US',
		});

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		return MovieMapper.toDetailsDTO(movie);
	}
}
