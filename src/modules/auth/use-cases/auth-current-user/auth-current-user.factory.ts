import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { AuthCurrentUserController } from './AuthCurrentUserController';
import { AuthCurrentUserUseCase } from './AuthCurrentUserUseCase';

const usersRepository = new PrismaUsersRepository();
const authCurrentUserUseCase = new AuthCurrentUserUseCase(usersRepository);
const authCurrentUserController = new AuthCurrentUserController(
	authCurrentUserUseCase
);

export { authCurrentUserController };
