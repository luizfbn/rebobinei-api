import { PrismaMoviesRepository } from '../../../../infra/database/prisma/repositories/prisma-movies.repository';
import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewStatsByMovieController } from './ReviewStatsByMovieController';
import { ReviewStatsByMovieUseCase } from './ReviewStatsByMovieUseCase';

const moviesRepository = new PrismaMoviesRepository();
const reviewsRepository = new PrismaReviewsRepository();
const reviewStatsByMovieUseCase = new ReviewStatsByMovieUseCase(
	reviewsRepository,
	moviesRepository
);
const reviewStatsByMovieController = new ReviewStatsByMovieController(
	reviewStatsByMovieUseCase
);

export { reviewStatsByMovieController };
