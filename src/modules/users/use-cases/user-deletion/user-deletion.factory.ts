import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserDeletionController } from './UserDeletionController';
import { UserDeletionUseCase } from './UserDeletionUseCase';

const usersRepository = new PrismaUsersRepository();
const userDeletionUseCase = new UserDeletionUseCase(usersRepository);
const userDeletionController = new UserDeletionController(userDeletionUseCase);

export { userDeletionController };
