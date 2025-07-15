import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserEmailChangeController } from './UserEmailChangeController';
import { UserEmailChangeUseCase } from './UserEmailChangeUseCase';

const usersRepository = new PrismaUsersRepository();
const userEmailChangeUseCase = new UserEmailChangeUseCase(usersRepository);
const userEmailChangeController = new UserEmailChangeController(
	userEmailChangeUseCase
);

export { userEmailChangeController };
