import { prisma } from '../prisma.service';
import { Prisma, Movie as PrismaMovie } from '@prisma/client';
import { MoviesRepository } from '../../../../modules/movies/repositories/movies.repository.interface';
import {
	MovieCreateInputDTO,
	MovieUpdateInputDTO,
} from '../../../../modules/movies/repositories/movies.repository.types';
import { Genre } from '../../../../modules/movies/entities/genre.interface';
import { CrewMember } from '../../../../modules/movies/entities/crew-member.interface';
import { CastMember } from '../../../../modules/movies/entities/cast-member.interface';
import { Movie } from '../../../../modules/movies/entities/movie.entity';

export class PrismaMoviesRepository implements MoviesRepository {
	async create(data: MovieCreateInputDTO) {
		const createdMovie = await prisma.movie.create({
			data: {
				tmdbId: data.tmdbId,
				title: data.title,
				originalTitle: data.originalTitle,
				overview: data.overview,
				posterPath: data.posterPath,
				backdropPath: data.backdropPath,
				releaseDate: data.releaseDate,
				runtime: data.runtime,
				budget: data.budget,
				revenue: data.revenue,
				certification: data.certification,
				genres: JSON.stringify(data.genres),
				directors: JSON.stringify(data.directors),
				cast: JSON.stringify(data.cast),
			},
		});

		return this.toEntity(createdMovie);
	}

	async update(id: string, data: MovieUpdateInputDTO) {
		const updatedMovie = await prisma.movie.update({
			where: {
				id,
			},
			data: {
				tmdbId: data.tmdbId,
				title: data.title,
				originalTitle: data.originalTitle,
				overview: data.overview,
				posterPath: data.posterPath,
				backdropPath: data.backdropPath,
				releaseDate: data.releaseDate,
				runtime: data.runtime,
				certification: data.certification,
				genres: JSON.stringify(data.genres),
				directors: JSON.stringify(data.directors),
				cast: JSON.stringify(data.cast),
			},
		});

		return this.toEntity(updatedMovie);
	}

	async findByTmdbId(id: number) {
		const movie = await prisma.movie.findUnique({ where: { tmdbId: id } });

		if (!movie) {
			return null;
		}

		return this.toEntity(movie);
	}

	private toEntity(prismaMovie: PrismaMovie) {
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
			certification: prismaMovie.certification,
			genres: this.parseJsonField<Genre>(prismaMovie.genres),
			directors: this.parseJsonField<CrewMember>(prismaMovie.directors),
			cast: this.parseJsonField<CastMember>(prismaMovie.cast),
			createdAt: prismaMovie.createdAt,
			updatedAt: prismaMovie.updatedAt,
		};

		return Movie.create(movieProps, prismaMovie.id);
	}

	private parseJsonField<T>(field: Prisma.JsonValue | null): T[] {
		if (!field) {
			return [];
		}
		try {
			const data = typeof field === 'string' ? JSON.parse(field) : field;
			if (Array.isArray(data)) {
				return data as T[];
			}
			return [];
		} catch (error) {
			console.error('Failed to parse JSON field:', error);
			return [];
		}
	}
}
