import { Movie } from './entities/movie.entity';
import { MovieListItemOutputDTO } from './dtos/movie-list-item.output.dto';
import { MovieDetailsOutputDTO } from './dtos/movie-details.output.dto';
import {
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
} from '../../infra/http/tmdb/tmdb-api.interfaces';
import { CastMember } from './entities/cast-member.interface';
import { CrewMember } from './entities/crew-member.interface';

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
			genres: movie.genres ? movie.genres.map((genre) => genre.name) : [],
			runtime: movie.runtime ?? 0,
			budget: movie.budget ?? 0,
			revenue: movie.revenue ?? 0,
			certification: movie.certification ?? null,
			directors: movie.directors
				? movie.directors.map((director) => director.name)
				: [],
			cast: movie.cast ?? [],
		};
	}

	public static fromApiListItemToEntity(apiMovie: TmdbMovieDTO) {
		const movieProps = {
			tmdbId: apiMovie.id,
			title: apiMovie.title,
			originalTitle: apiMovie.original_title,
			overview: apiMovie.overview,
			releaseDate: apiMovie.release_date,
			posterUrl: apiMovie.poster_path
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/w500${apiMovie.poster_path}`
				: null,
			backdropUrl: apiMovie.backdrop_path
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/original${
						apiMovie.backdrop_path
				  }`
				: null,
		};

		return Movie.create(movieProps);
	}

	public static fromApiDetailsToEntity(
		apiMovie: TmdbMovieDetailsDTO,
		certification: string | undefined,
		directors: CrewMember[],
		cast: CastMember[]
	) {
		const movieProps = {
			tmdbId: apiMovie.id,
			title: apiMovie.title,
			originalTitle: apiMovie.original_title,
			overview: apiMovie.overview,
			releaseDate: apiMovie.release_date,
			posterUrl: apiMovie.poster_path
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/w500${apiMovie.poster_path}`
				: null,
			backdropUrl: apiMovie.backdrop_path
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/original${
						apiMovie.backdrop_path
				  }`
				: null,
			genres: apiMovie.genres,
			runtime: apiMovie.runtime,
			budget: apiMovie.budget,
			revenue: apiMovie.revenue,
			certification,
			directors,
			cast,
		};

		return Movie.create(movieProps);
	}
}
