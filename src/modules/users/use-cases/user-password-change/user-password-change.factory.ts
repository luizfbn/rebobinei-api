import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserPasswordChangeController } from './UserPasswordChangeController';
import { UserPasswordChangeUseCase } from './UserPasswordChangeUseCase';

const usersRepository = new PrismaUsersRepository();
const userPasswordChangeUseCase = new UserPasswordChangeUseCase(
	usersRepository
);
const userPasswordChangeController = new UserPasswordChangeController(
	userPasswordChangeUseCase
);

export { userPasswordChangeController };
