import { User } from '../entities/user.entity';

export type UserCreateInputDTO = Omit<
	User,
	'id' | 'role' | 'createdAt' | 'updatedAt'
>;
