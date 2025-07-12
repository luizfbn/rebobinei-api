import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserAuthenticationController } from './UserAuthenticationController';
import { UserAuthenticationUseCase } from './UserAuthenticationUseCase';

const usersRepository = new PrismaUsersRepository();
const userAuthenticationUseCase = new UserAuthenticationUseCase(
	usersRepository
);
const userAuthenticationController = new UserAuthenticationController(
	userAuthenticationUseCase
);

export { userAuthenticationController };
