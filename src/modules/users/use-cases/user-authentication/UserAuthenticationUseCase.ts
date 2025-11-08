import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserAuthenticationInputDTO } from './user-authentication.schema';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { UserMapper } from '../../user.mapper';

export class UserAuthenticationUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ email, password }: UserAuthenticationInputDTO) {
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
