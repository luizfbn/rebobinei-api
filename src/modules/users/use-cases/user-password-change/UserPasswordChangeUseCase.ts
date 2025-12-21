import bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserPasswordChangeInputDTO } from './user-password-change.schema';
import { t } from '../../../../core/i18n';

export class UserPasswordChangeUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
		currentPassword,
		newPassword,
	}: UserPasswordChangeInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError(t('userNotFound'));
		}

		const doesCurrentPasswordMatch = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!doesCurrentPasswordMatch) {
			throw new InvalidCredentialsError(t('wrongPassword'));
		}

		const newHashedPassword = await bcrypt.hash(newPassword, 12);

		await this.usersRepository.update(userId, { password: newHashedPassword });
	}
}
