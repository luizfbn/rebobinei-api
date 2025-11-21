import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserProfileController } from './UserProfileController';
import { UserProfileUseCase } from './UserProfileUseCase';

const usersRepository = new PrismaUsersRepository();
const userProfileUseCase = new UserProfileUseCase(usersRepository);
const userProfileController = new UserProfileController(userProfileUseCase);

export { userProfileController };
