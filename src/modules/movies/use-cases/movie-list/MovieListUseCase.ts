import {
	IMoviesProvider,
	PaginatedMovies,
} from '../../providers/movies.provider.interface';
import { MovieListInputDTO } from './movie-list.dto';
import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { MovieListItemOutputDTO } from '../../dtos/movie-list-item.output.dto';
import { MovieMapper } from '../../movie.mapper';

export class MovieListUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(
		dto: MovieListInputDTO
	): Promise<PaginatedOutputDTO<MovieListItemOutputDTO>> {
		let paginatedMovies: PaginatedMovies;
		const params = { page: dto.page, language: dto.language };

		switch (dto.category) {
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
				throw new Error(`Category '${dto.category}' is not valid.`);
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
