import { Movie } from './movie.entity';
import { MovieListItemOutputDTO } from './dtos/movie-list-item.output.dto';
import { MovieDetailsOutputDTO } from './dtos/movie-details.output.dto';
import {
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
} from '../../infra/http/tmdb/tmdb-api.types';

export class MovieMapper {
	public static toListItemDTO(movie: Movie): MovieListItemOutputDTO {
		return {
			tmdbId: movie.tmdbId,
			title: movie.title,
			originalTitle: movie.originalTitle,
			overview: movie.overview,
			releaseDate: movie.releaseDate,
			posterUrl: movie.posterUrl,
			backdropUrl: movie.backdropUrl,
		};
	}

	public static toDetailsDTO(movie: Movie): MovieDetailsOutputDTO {
		return {
			tmdbId: movie.tmdbId,
			title: movie.title,
			originalTitle: movie.originalTitle,
			overview: movie.overview,
			releaseDate: movie.releaseDate,
			posterUrl: movie.posterUrl,
			backdropUrl: movie.backdropUrl,
			genres: movie.genres!,
			budget: movie.budget!,
			revenue: movie.revenue!,
			certification: movie.certification!,
		};
	}

	public static fromApiListItemToEntity(apiMovie: TmdbMovieDTO): Movie {
		const movieProps = {
			tmdbId: apiMovie.id,
			title: apiMovie.title,
			originalTitle: apiMovie.original_title,
			overview: apiMovie.overview,
			releaseDate: apiMovie.release_date,
			posterUrl: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
			backdropUrl: `https://image.tmdb.org/t/p/original${apiMovie.backdrop_path}`,
		};

		return Movie.create(movieProps);
	}

	public static fromApiDetailsToEntity(apiMovie: TmdbMovieDetailsDTO): Movie {
		const movieProps = {
			tmdbId: apiMovie.id,
			title: apiMovie.title,
			originalTitle: apiMovie.original_title,
			overview: apiMovie.overview,
			releaseDate: apiMovie.release_date,
			posterUrl: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
			backdropUrl: `https://image.tmdb.org/t/p/original${apiMovie.backdrop_path}`,
			genres: apiMovie.genres,
			budget: apiMovie.budget,
			revenue: apiMovie.revenue,
		};

		return Movie.create(movieProps);
	}
}
