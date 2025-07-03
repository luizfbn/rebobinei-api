import { Movie } from '../../movie.entity';
import { IMoviesProvider } from '../../providers/IMoviesProvider';
import { ListMoviesDTO } from './ListMoviesDTO';
import { MovieListItemDTO } from './MovieListItemDTO';

export class ListMoviesUseCase {
	constructor(private moviesProvider: IMoviesProvider) {}

	async execute(dto: ListMoviesDTO) {
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

		const moviesDto: MovieListItemDTO[] = movies.map((movie) => {
			return {
				tmdbId: movie.tmdbId,
				title: movie.title,
				originalTitle: movie.originalTitle,
				overview: movie.overview,
				releaseDate: movie.releaseDate,
				posterUrl: movie.posterUrl,
				backdropUrl: movie.backdropUrl,
			};
		});

		return moviesDto;
	}
}
