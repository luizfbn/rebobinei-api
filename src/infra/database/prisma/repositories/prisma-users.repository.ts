import { prisma } from '../prisma.service';
import { IUsersRepository } from '../../../../modules/users/repositories/IUsersRepository';
import { User } from '../../../../modules/users/entities/user.entity';

export class PrismaUsersRepository implements IUsersRepository {
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	}
}
