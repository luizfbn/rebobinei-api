import { prisma } from '../prisma.service';
import { IUsersRepository } from '../../../../modules/users/repositories/IUsersRepository';
import { User as DomainUser } from '../../../../modules/users/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';
import { UserMapper } from '../../../../modules/users/user.mapper';
import { UserCreateInputDTO } from '../../../../modules/users/dtos/user-create.input.dto';
import { UserUpdateInputDTO } from '../../../../modules/users/dtos/user-update.input.dto';

export class PrismaUsersRepository implements IUsersRepository {
	async create({ name, username, email, password }: UserCreateInputDTO) {
		await prisma.user.create({
			data: {
				name,
				username,
				email,
				password,
			},
		});
	}

	async update(id: string, data: UserUpdateInputDTO): Promise<DomainUser> {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data,
		});

		return UserMapper.toEntity(updatedUser);
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
