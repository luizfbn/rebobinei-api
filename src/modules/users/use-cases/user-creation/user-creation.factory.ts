import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserCreationUseCase } from './UserCreationUseCase';
import { UserCreationController } from './UserCreationController';

const usersRepository = new PrismaUsersRepository();
const userCreationUseCase = new UserCreationUseCase(usersRepository);
const userCreationController = new UserCreationController(userCreationUseCase);

export { userCreationController };
