import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { ReviewListUseCase } from './ReviewListUseCase';
import { ReviewListController } from './ReviewListController';

const reviewsRepository = new PrismaReviewsRepository();
const reviewListUseCase = new ReviewListUseCase(reviewsRepository);
const reviewListController = new ReviewListController(reviewListUseCase);

export { reviewListController };
