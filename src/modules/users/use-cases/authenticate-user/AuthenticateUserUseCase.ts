import bcrypt from 'bcryptjs';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AuthenticateInputDTO } from './authenticate-user.dto';
import { User } from '../../entities/user.entity';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class AuthenticateUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ email, password }: AuthenticateInputDTO): Promise<User> {
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
