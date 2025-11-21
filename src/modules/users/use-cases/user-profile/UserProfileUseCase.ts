import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserMapper } from '../../user.mapper';
import { UserProfileInputDTO } from './user-profile.schema';

export class UserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ id: userId }: UserProfileInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		return UserMapper.toProfileDTO(user);
	}
}
