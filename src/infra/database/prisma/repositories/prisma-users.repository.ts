import { prisma } from '../prisma.service';
import {
	CreateParams,
	IUsersRepository,
} from '../../../../modules/users/repositories/IUsersRepository';
import { User as DomainUser } from '../../../../modules/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { UserMapper } from '../../../../modules/users/user.mapper';

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

	async findById(id: string): Promise<DomainUser | null> {
		const user = await prisma.user.findUnique({ where: { id } });
		return this.mapToDomain(user);
	}

	async findByEmail(email: string): Promise<DomainUser | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		return this.mapToDomain(user);
	}

	async findByUsername(username: string): Promise<DomainUser | null> {
		const user = await prisma.user.findUnique({ where: { username } });
		return this.mapToDomain(user);
	}

	private mapToDomain(user: PrismaUser | null) {
		if (!user) {
			return null;
		}
		return UserMapper.toEntity(user);
	}
}
