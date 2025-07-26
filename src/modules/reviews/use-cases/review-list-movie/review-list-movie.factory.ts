import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewListByMovieUseCase } from './ReviewListByMovieUseCase';
import { ReviewListByMovieController } from './ReviewListByMovieController';
import { PrismaMoviesRepository } from '../../../../infra/database/prisma/repositories/prisma-movies.repository';

const moviesRepository = new PrismaMoviesRepository();
const reviewsRepository = new PrismaReviewsRepository();
const reviewListByMovieUseCase = new ReviewListByMovieUseCase(
	reviewsRepository,
	moviesRepository
);
const reviewListByMovieController = new ReviewListByMovieController(
	reviewListByMovieUseCase
);

export { reviewListByMovieController };
