import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../../users/repositories/users.repository.interface';
import { AuthLoginInputDTO } from './auth-login.schema';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { UserMapper } from '../../../users/user.mapper';

export class AuthLoginUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ email, password }: AuthLoginInputDTO) {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);

		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError();
		}

		return UserMapper.toDetailsDTO(user);
	}
}
