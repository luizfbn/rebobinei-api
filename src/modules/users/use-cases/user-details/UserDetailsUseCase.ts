import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../repositories/users.repository.interface';
import { UserMapper } from '../../user.mapper';
import { UserDetailsInputDTO } from './user-details.schema';

export class UserDetailsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ id: userId }: UserDetailsInputDTO) {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		return UserMapper.toDetailsDTO(user);
	}
}
