import { IMoviesProvider } from '../../providers/movies.provider.interface';
import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { MovieListItemOutputDTO } from '../../dtos/movie-list-item.output.dto';
import { SearchMoviesInputDTO } from './search-movies.dto';
import { MovieMapper } from '../../movie.mapper';

export class SearchMoviesUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(
		dto: SearchMoviesInputDTO
	): Promise<PaginatedOutputDTO<MovieListItemOutputDTO>> {
		const paginatedMovies = await this.moviesProvider.searchByTitle(dto);

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
