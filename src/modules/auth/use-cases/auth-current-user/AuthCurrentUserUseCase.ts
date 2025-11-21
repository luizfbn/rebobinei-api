import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../../users/repositories/users.repository.interface';
import { UserMapper } from '../../../users/user.mapper';
import { AuthCurrentUserInputDTO } from './auth-current-user.schema';

export class AuthCurrentUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ id: userId }: AuthCurrentUserInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		return UserMapper.toDetailsDTO(user);
	}
}
