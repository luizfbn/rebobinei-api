import { prisma } from '../prisma.service';
import { MoviesRepository } from '../../../../modules/movies/repositories/movies.repository.interface';
import { MovieMapper } from '../../../../modules/movies/movie.mapper';
import {
	MovieCreateInputDTO,
	MovieUpdateInputDTO,
} from '../../../../modules/movies/repositories/movies.repository.types';

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

		return MovieMapper.toEntity(createdMovie);
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

		return MovieMapper.toEntity(updatedMovie);
	}

	async findByTmdbId(id: number) {
		const movie = await prisma.movie.findUnique({ where: { tmdbId: id } });

		if (!movie) {
			return null;
		}

		return MovieMapper.toEntity(movie);
	}
}
