import { MoviesProvider } from '../../providers/movies.provider.interface';
import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { MovieListItemOutputDTO } from '../../dtos/movie-list-item.output.dto';
import { MovieSearchInputDTO } from './movie-search.schema';
import { MovieMapper } from '../../movie.mapper';

export class MovieSearchUseCase {
	constructor(private moviesProvider: MoviesProvider) {}

	async execute({
		query,
		page,
	}: MovieSearchInputDTO): Promise<PaginatedOutputDTO<MovieListItemOutputDTO>> {
		const paginatedMovies = await this.moviesProvider.searchByTitle({
			query,
			language: process.env.LOCALE ?? 'en-US',
			page,
		});

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
