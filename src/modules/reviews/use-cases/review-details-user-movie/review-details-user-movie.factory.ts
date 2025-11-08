import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewDetailsByUserAndMovieUseCase } from './ReviewDetailsByUserAndMovieUseCase';
import { ReviewDetailsByUserAndMovieController } from './ReviewDetailsByUserAndMovieController';
import { PrismaMoviesRepository } from '../../../../infra/database/prisma/repositories/prisma-movies.repository';

const moviesRepository = new PrismaMoviesRepository();
const reviewsRepository = new PrismaReviewsRepository();
const reviewDetailsByUserAndMovieUseCase =
	new ReviewDetailsByUserAndMovieUseCase(reviewsRepository, moviesRepository);
const reviewDetailsByUserAndMovieController =
	new ReviewDetailsByUserAndMovieController(reviewDetailsByUserAndMovieUseCase);

export { reviewDetailsByUserAndMovieController };
