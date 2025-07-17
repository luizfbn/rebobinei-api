import bcrypt from 'bcryptjs';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserEmailChangeInputDTO } from './user-email-change.schema';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';

export class UserEmailChangeUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ userId, password, newEmail }: UserEmailChangeInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const userWithSameEmail = await this.usersRepository.findByEmail(newEmail);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError(
				'An user with this email already exists.'
			);
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError('The password is incorrect.');
		}

		await this.usersRepository.update(userId, { email: newEmail });
	}
}
