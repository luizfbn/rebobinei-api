import bcrypt from 'bcryptjs';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserCreationInputDTO } from './user-creation.dto';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';

export class UserCreationUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ name, username, email, password }: UserCreationInputDTO) {
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
