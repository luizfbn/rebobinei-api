import { Movie } from '../../entities/movie.entity';
import { IMoviesProvider } from '../../providers/movies.provider.interface';
import { ListMoviesInputDTO } from './list-movies.dto';
import { MovieMapper } from '../../movie.mapper';

export class ListMoviesUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(dto: ListMoviesInputDTO) {
		let movies: Movie[] = [];
		const params = { page: dto.page, language: dto.language };

		switch (dto.category) {
			case 'popular':
				movies = await this.moviesProvider.getPopular(params);
				break;
			case 'trending':
				movies = await this.moviesProvider.getTrending(params);
				break;
			case 'upcoming':
				movies = await this.moviesProvider.getUpcoming(params);
				break;
			default:
				throw new Error(`Category '${dto.category}' is not valid.`);
		}

		if (!movies || movies.length === 0) {
			return [];
		}

		const moviesDto = movies.map((movie) => {
			return MovieMapper.toListItemDTO(movie);
		});

		return moviesDto;
	}
}
