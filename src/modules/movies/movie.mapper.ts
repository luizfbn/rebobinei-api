import { Movie } from './entities/movie.entity';
import { Prisma, Movie as PrismaMovie } from '@prisma/client';
import { MovieListItemOutputDTO } from './dtos/movie-list-item.output.dto';
import { MovieDetailsOutputDTO } from './dtos/movie-details.output.dto';
import {
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
} from '../../infra/http/tmdb/tmdb-api.interfaces';
import { CastMember } from './entities/cast-member.interface';
import { CrewMember } from './entities/crew-member.interface';
import { Genre } from './entities/genre.interface';

export class MovieMapper {
	public static toListItemDTO(movie: Movie): MovieListItemOutputDTO {
		return {
			tmdbId: movie.tmdbId,
			title: movie.title,
			originalTitle: movie.originalTitle,
			overview: movie.overview,
			releaseDate: movie.releaseDate,
			posterUrl: movie.posterPath
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/w500${movie.posterPath}`
				: null,
			backdropUrl: movie.backdropPath
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/original${
						movie.backdropPath
				  }`
				: null,
		};
	}

	public static toDetailsDTO(movie: Movie): MovieDetailsOutputDTO {
		return {
			tmdbId: movie.tmdbId,
			title: movie.title,
			originalTitle: movie.originalTitle,
			overview: movie.overview,
			releaseDate: movie.releaseDate,
			posterUrl: movie.posterPath
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/w500${movie.posterPath}`
				: null,
			backdropUrl: movie.backdropPath
				? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/original${
						movie.backdropPath
				  }`
				: null,
			runtime: movie.runtime ?? 0,
			budget: movie.budget ?? 0,
			revenue: movie.revenue ?? 0,
			certification: movie.certification ?? null,
			genres: movie.genres ? movie.genres.map((genre) => genre.name) : [],
			directors: movie.directors
				? movie.directors.map((director) => director.name)
				: [],
			cast: movie.cast ?? [],
		};
	}

	public static toEntity(prismaMovie: PrismaMovie) {
		const movieProps = {
			tmdbId: prismaMovie.tmdbId,
			title: prismaMovie.title,
			originalTitle: prismaMovie.originalTitle,
			overview: prismaMovie.overview,
			releaseDate: prismaMovie.releaseDate,
			posterPath: prismaMovie.posterPath,
			backdropPath: prismaMovie.backdropPath,
			runtime: prismaMovie.runtime,
			budget: prismaMovie.budget,
			revenue: prismaMovie.revenue,
			certification: prismaMovie.certification ?? null,
			genres: this.parseJsonField<Genre>(prismaMovie.genres as string | null),
			directors: this.parseJsonField<CrewMember>(
				prismaMovie.directors as string | null
			),
			cast: this.parseJsonField<CastMember>(prismaMovie.cast as string | null),
			createdAt: prismaMovie.createdAt,
			updatedAt: prismaMovie.updatedAt,
		};
		return Movie.create(movieProps, prismaMovie.id);
	}

	public static toEntityFromApiListItem(apiMovie: TmdbMovieDTO) {
		const movieProps = {
			tmdbId: apiMovie.id,
			title: apiMovie.title,
			originalTitle: apiMovie.original_title,
			overview: apiMovie.overview,
			releaseDate: apiMovie.release_date
				? new Date(apiMovie.release_date)
				: null,
			posterPath: apiMovie.poster_path,
			backdropPath: apiMovie.backdrop_path,
			runtime: 0,
			budget: 0,
			revenue: 0,
			certification: null,
			genres: [],
			directors: [],
			cast: [],
		};

		return Movie.create(movieProps);
	}

	public static toEntityfromApiDetails(
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
			releaseDate: apiMovie.release_date
				? new Date(apiMovie.release_date)
				: null,
			posterPath: apiMovie.poster_path,
			backdropPath: apiMovie.backdrop_path,
			runtime: apiMovie.runtime,
			budget: apiMovie.budget,
			revenue: apiMovie.revenue,
			certification: certification ?? null,
			genres: apiMovie.genres,
			directors,
			cast,
		};

		return Movie.create(movieProps);
	}

	private static parseJsonField<T>(field: Prisma.JsonValue | null): T[] {
		if (!field) {
			return [];
		}
		try {
			const data = typeof field === 'string' ? JSON.parse(field) : field;
			if (Array.isArray(data)) {
				return data as T[];
			}
			return [];
		} catch (e) {
			console.error('Failed to parse JSON field:', e);
			return [];
		}
	}
}
