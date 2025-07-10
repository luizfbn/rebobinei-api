import bcrypt from 'bcryptjs';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserInputDTO } from './create-user.dto';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';

export class CreateUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ name, username, email, password }: CreateUserInputDTO) {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
		const userWithSameUsername = await this.usersRepository.findByUsername(
			username
		);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError(
				'An user with this email already exists.'
			);
		}

		if (userWithSameUsername) {
			throw new UserAlreadyExistsError(
				'An user with this username already exists.'
			);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		await this.usersRepository.create({
			name,
			username,
			email,
			password: hashedPassword,
		});
	}
}
