import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { AuthLoginController } from './AuthLoginController';
import { AuthLoginUseCase } from './AuthLoginUseCase';

const usersRepository = new PrismaUsersRepository();
const authLoginUseCase = new AuthLoginUseCase(usersRepository);
const authLoginController = new AuthLoginController(authLoginUseCase);

export { authLoginController };
