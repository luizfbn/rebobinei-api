import { TmdbMoviesProvider } from '../../../../infra/http/tmdb/tmdb-movies.provider';
import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { PrismaMoviesRepository } from '../../../../infra/database/prisma/repositories/prisma-movies.repository';
import { ReviewCreationUseCase } from './ReviewCreationUseCase';
import { ReviewCreationController } from './ReviewCreationController';

const moviesProvider = new TmdbMoviesProvider();
const moviesRepository = new PrismaMoviesRepository();
const reviewsRepository = new PrismaReviewsRepository();
const reviewCreationUseCase = new ReviewCreationUseCase(
	reviewsRepository,
	moviesRepository,
	moviesProvider
);
const reviewCreationController = new ReviewCreationController(
	reviewCreationUseCase
);

export { reviewCreationController };
