import { UserCreateInputDTO } from '../dtos/user-create.input.dto';
import { UserUpdateInputDTO } from '../dtos/user-update.input.dto';
import { User } from '../entities/user.entity';

export interface IUsersRepository {
	create(data: UserCreateInputDTO): Promise<void>;
	update(id: string, data: UserUpdateInputDTO): Promise<User>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
}
