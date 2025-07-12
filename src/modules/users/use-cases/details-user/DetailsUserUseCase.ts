import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UserMapper } from '../../user.mapper';
import { DetailsUserInputDTO } from './details-user.dto';

export class DetailsUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ id }: DetailsUserInputDTO) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		return UserMapper.toDetailsDTO(user);
	}
}
