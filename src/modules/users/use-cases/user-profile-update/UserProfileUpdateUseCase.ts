import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserMapper } from '../../user.mapper';
import { UserProfileUpdateInputDTO } from './user-profile-update.schema';

export class UserProfileUpdateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ userId, name, username }: UserProfileUpdateInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		if (username) {
			const userWithSameUsername = await this.usersRepository.findByUsername(
				username.toLocaleLowerCase()
			);
			if (userWithSameUsername) {
				throw new UserAlreadyExistsError(
					'An user with this username already exists.'
				);
			}
		}

		const updatedUser = await this.usersRepository.update(userId, {
			name,
			username,
		});

		return UserMapper.toProfileDTO(updatedUser);
	}
}
