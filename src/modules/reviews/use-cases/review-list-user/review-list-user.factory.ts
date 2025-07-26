import { PrismaReviewsRepository } from '../../../../infra/database/prisma/repositories/prisma-reviews.repository';
import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { ReviewListByUserUseCase } from './ReviewListByUserUseCase';
import { ReviewListByUserController } from './ReviewListByUserController';

const usersRepository = new PrismaUsersRepository();
const reviewsRepository = new PrismaReviewsRepository();
const reviewListByUserUseCase = new ReviewListByUserUseCase(
	reviewsRepository,
	usersRepository
);
const reviewListByUserController = new ReviewListByUserController(
	reviewListByUserUseCase
);

export { reviewListByUserController };
