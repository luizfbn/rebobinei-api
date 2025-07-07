import { MovieMapper } from '../../movie.mapper';
import { IMoviesProvider } from '../../providers/movies.provider.interface';
import { SearchMoviesInputDTO } from './search-movies.dto';

export class SearchMoviesUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(dto: SearchMoviesInputDTO) {
		const movies = await this.moviesProvider.searchByTitle(dto);

		if (!movies || movies.length === 0) {
			return [];
		}

		const moviesDto = movies.map((movie) => {
			return MovieMapper.toListItemDTO(movie);
		});

		return moviesDto;
	}
}
