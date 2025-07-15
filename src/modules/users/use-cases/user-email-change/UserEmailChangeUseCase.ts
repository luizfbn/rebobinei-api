import bcrypt from 'bcryptjs';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserEmailChangeInputDTO } from './user-email-change.dto';

export class UserEmailChangeUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({ userId, password, newEmail }: UserEmailChangeInputDTO) {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError('The password is incorrect.');
		}

		await this.userRepository.update(userId, { email: newEmail });
	}
}
