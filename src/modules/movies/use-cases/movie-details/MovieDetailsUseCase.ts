import { env } from '../../../../core/config/env';
import { MovieMapper } from '../../movie.mapper';
import { MoviesProvider } from '../../providers/movies.provider.interface';
import { MovieDetailsInputDTO } from './movie-details.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { t } from '../../../../core/i18n';

export class MovieDetailsUseCase {
	constructor(private moviesProvider: MoviesProvider) {}

	async execute({ id }: MovieDetailsInputDTO) {
		const movie = await this.moviesProvider.getDetailsById({
			id,
			language: env.LOCALE,
		});

		if (!movie) {
			throw new ResourceNotFoundError(t('movieNotFound'));
		}

		return MovieMapper.toDetailsDTO(movie);
	}
}
