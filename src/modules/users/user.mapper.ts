import { User } from './entities/user.entity';
import { UserDetailsOutputDTO } from './dtos/user-details.output.dto';
import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
	public static toDetailsDTO(user: User): UserDetailsOutputDTO {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			name: user.name,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	public static toEntity(prismaUser: PrismaUser) {
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
