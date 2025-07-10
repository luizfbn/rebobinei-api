import { prisma } from '../prisma.service';
import {
	CreateParams,
	IUsersRepository,
} from '../../../../modules/users/repositories/IUsersRepository';
import { User } from '../../../../modules/users/entities/user.entity';

export class PrismaUsersRepository implements IUsersRepository {
	async create({ name, username, email, password }: CreateParams) {
		await prisma.user.create({
			data: {
				name,
				username,
				email,
				password,
			},
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	}

	async findByUsername(username: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { username } });
		return user;
	}
}
