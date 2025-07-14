import { User } from '../entities/user.entity';

export type UserUpdateInputDTO = Partial<
	Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;
