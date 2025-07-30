import { prisma } from '../prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { UsersRepository } from '../../../../modules/users/repositories/users.repository.interface';
import {
	UserCreateInputDTO,
	UserUpdateInputDTO,
} from '../../../../modules/users/repositories/users.repository.types';
import { User } from '../../../../modules/users/entities/user.entity';

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

		return this.toEntity(updatedUser);
	}

	async delete(id: string) {
		await prisma.user.delete({ where: { id } });
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

		return this.toEntity(user);
	}

	private toEntity(prismaUser: PrismaUser) {
		const userProps = {
			id: prismaUser.id,
			name: prismaUser.name,
			username: prismaUser.username,
			email: prismaUser.email,
			password: prismaUser.password,
			role: prismaUser.role,
			createdAt: prismaUser.createdAt,
			updatedAt: prismaUser.updatedAt,
		};

		return User.create(userProps);
	}
}
