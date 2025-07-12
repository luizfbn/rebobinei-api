import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users.repository';
import { DetailsUserController } from './DetailsUserController';
import { DetailsUserUseCase } from './DetailsUserUseCase';

const usersRepository = new PrismaUsersRepository();
const detailsUserUseCase = new DetailsUserUseCase(usersRepository);
const detailsUserController = new DetailsUserController(detailsUserUseCase);

export { detailsUserController };
