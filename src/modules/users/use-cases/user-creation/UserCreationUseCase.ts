import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserCreationInputDTO } from './user-creation.schema';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';
import { t } from '../../../../core/i18n';

export class UserCreationUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ name, username, email, password }: UserCreationInputDTO) {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError(t('userWithEmailAlreadyExists'));
		}

		const userWithSameUsername = await this.usersRepository.findByUsername(
			username.toLocaleLowerCase()
		);
		if (userWithSameUsername) {
			throw new UserAlreadyExistsError(t('userWithUsernameAlreadyExists'));
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
