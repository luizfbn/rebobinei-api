import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const usersRepository = new PrismaUsersRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
const authenticateUserController = new AuthenticateUserController(
	authenticateUserUseCase
);

export { authenticateUserController };
