import { prisma } from '../prisma.service';
import { UsersRepository } from '../../../../modules/users/repositories/users.repository.interface';
import { User as PrismaUser } from '@prisma/client';
import { UserMapper } from '../../../../modules/users/user.mapper';
import {
	UserCreateInputDTO,
	UserUpdateInputDTO,
} from '../../../../modules/users/repositories/users.repository.types';

export class PrismaUsersRepository implements UsersRepository {
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

	async update(id: string, data: UserUpdateInputDTO) {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data,
		});

		return UserMapper.toEntity(updatedUser);
	}

	async findById(id: string) {
		const user = await prisma.user.findUnique({ where: { id } });
		return this.mapToDomain(user);
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		return this.mapToDomain(user);
	}

	async findByUsername(username: string) {
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
