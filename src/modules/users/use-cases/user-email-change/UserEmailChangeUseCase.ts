import bcrypt from 'bcryptjs';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserEmailChangeInputDTO } from './user-email-change.schema';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';
import { t } from '../../../../core/i18n';

export class UserEmailChangeUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId, password, newEmail }: UserEmailChangeInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError(t('userNotFound'));
		}

		const userWithSameEmail = await this.usersRepository.findByEmail(newEmail);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError(t('userWithEmailAlreadyExists'));
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError(t('wrongPassword'));
		}

		await this.usersRepository.update(userId, { email: newEmail });
	}
}
