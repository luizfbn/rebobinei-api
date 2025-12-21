import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserDeletionInputDTO } from './user-deletion.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { t } from '../../../../core/i18n';

export class UserDeletionUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId, password }: UserDeletionInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError(t('userNotFound'));
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError(t('wrongPassword'));
		}

		await this.usersRepository.delete(userId);
	}
}
