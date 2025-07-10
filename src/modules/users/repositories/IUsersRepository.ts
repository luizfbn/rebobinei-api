import { User } from '../entities/user.entity';

export interface CreateParams {
	name: string;
	username: string;
	email: string;
	password: string;
}
export interface IUsersRepository {
	create(params: CreateParams): Promise<void>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
}
