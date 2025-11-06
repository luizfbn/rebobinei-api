import { env } from '../../../../core/config/env';
import {
	MoviesProvider,
	PaginatedMovies,
} from '../../providers/movies.provider.interface';
import { MovieListInputDTO } from './movie-list.schema';
import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { MovieListItemOutputDTO } from '../../dtos/movie-list-item.output.dto';
import { MovieMapper } from '../../movie.mapper';

export class MovieListUseCase {
	constructor(private moviesProvider: MoviesProvider) {}

	async execute({
		category,
		page,
	}: MovieListInputDTO): Promise<PaginatedOutputDTO<MovieListItemOutputDTO>> {
		let paginatedMovies: PaginatedMovies;
		const params = { page, language: env.LOCALE };

		switch (category) {
			case 'popular':
				paginatedMovies = await this.moviesProvider.getPopular(params);
				break;
			case 'trending':
				paginatedMovies = await this.moviesProvider.getTrending(params);
				break;
			case 'upcoming':
				paginatedMovies = await this.moviesProvider.getUpcoming(params);
				break;
			default:
				throw new Error(`Category '${category}' is not valid.`);
		}

		const moviesDto = paginatedMovies.movies.map((movie) => {
			return MovieMapper.toListItemDTO(movie);
		});

		return {
			page: paginatedMovies.page,
			totalPages: paginatedMovies.totalPages,
			totalResults: paginatedMovies.totalResults,
			data: moviesDto,
		};
	}
}
