import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewDetailsUseCase } from './ReviewDetailsUseCase';
import { ReviewDetailsController } from './ReviewDetailsController';

const reviewsRepository = new PrismaReviewsRepository();
const reviewDetailsUseCase = new ReviewDetailsUseCase(reviewsRepository);
const reviewDetailsController = new ReviewDetailsController(
	reviewDetailsUseCase
);

export { reviewDetailsController };
