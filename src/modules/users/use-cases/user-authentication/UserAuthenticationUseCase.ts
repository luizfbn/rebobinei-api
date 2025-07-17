import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserAuthenticationInputDTO } from './user-authentication.schema';
import { User } from '../../entities/user.entity';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class UserAuthenticationUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: UserAuthenticationInputDTO): Promise<User> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);

		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError();
		}

		return user;
	}
}
