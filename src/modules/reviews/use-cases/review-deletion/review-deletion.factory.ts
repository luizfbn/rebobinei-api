import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewDeletionUseCase } from './ReviewDeletionUseCase';
import { ReviewDeletionController } from './ReviewDeletionController';

const reviewsRepository = new PrismaReviewsRepository();
const reviewDeletionUseCase = new ReviewDeletionUseCase(reviewsRepository);
const reviewDeletionController = new ReviewDeletionController(
	reviewDeletionUseCase
);

export { reviewDeletionController };
