import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { UserDetailsController } from './UserDetailsController';
import { UserDetailsUseCase } from './UserDetailsUseCase';

const usersRepository = new PrismaUsersRepository();
const userDetailsUseCase = new UserDetailsUseCase(usersRepository);
const userDetailsController = new UserDetailsController(userDetailsUseCase);

export { userDetailsController };
