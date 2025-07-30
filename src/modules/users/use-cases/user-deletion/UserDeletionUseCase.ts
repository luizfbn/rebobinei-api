import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserDeletionInputDTO } from './user-deletion.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class UserDeletionUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId, password }: UserDeletionInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const doesPasswordMatch = await bcrypt.compare(password, user.password);
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError('The password is incorrect.');
		}

		await this.usersRepository.delete(userId);
	}
}
