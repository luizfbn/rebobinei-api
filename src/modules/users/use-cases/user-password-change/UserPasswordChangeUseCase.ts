import bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserPasswordChangeInputDTO } from './user-password-change.dto';

export class UserPasswordChangeUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		userId,
		currentPassword,
		newPassword,
	}: UserPasswordChangeInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const doesCurrentPasswordMatch = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!doesCurrentPasswordMatch) {
			throw new InvalidCredentialsError('The current password is incorrect.');
		}

		const newHashedPassword = await bcrypt.hash(newPassword, 12);

		await this.usersRepository.update(userId, { password: newHashedPassword });
	}
}
