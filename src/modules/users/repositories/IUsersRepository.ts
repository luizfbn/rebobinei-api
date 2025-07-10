import { User } from '../entities/user.entity';

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
}
