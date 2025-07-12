import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserMapper } from '../../user.mapper';
import { UserDetailsInputDTO } from './user-details.dto';

export class UserDetailsUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ id }: UserDetailsInputDTO) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		return UserMapper.toDetailsDTO(user);
	}
}
