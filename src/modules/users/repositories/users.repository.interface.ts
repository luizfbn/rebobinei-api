import {
	UserCreateInputDTO,
	UserUpdateInputDTO,
} from './users.repository.types';
import { User } from '../entities/user.entity';

export interface UsersRepository {
	create(data: UserCreateInputDTO): Promise<void>;
	update(id: string, data: UserUpdateInputDTO): Promise<User>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
}
