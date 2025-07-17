import { MovieMapper } from '../../movie.mapper';
import { IMoviesProvider } from '../../providers/movies.provider.interface';
import { MovieDetailsInputDTO } from './movie-details.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class MovieDetailsUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute({ id, language }: MovieDetailsInputDTO) {
		const movie = await this.moviesProvider.getDetailsById({ id, language });

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		return MovieMapper.toDetailsDTO(movie);
	}
}
