import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserProfileUpdateController } from './UserProfileUpdateController';
import { UserProfileUpdateUseCase } from './UserProfileUpdateUseCase';

const usersRepository = new PrismaUsersRepository();
const userProfileUpdateUseCase = new UserProfileUpdateUseCase(usersRepository);
const userProfileUpdateController = new UserProfileUpdateController(
	userProfileUpdateUseCase
);

export { userProfileUpdateController };
