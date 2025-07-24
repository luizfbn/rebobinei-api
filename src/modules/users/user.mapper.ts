import { User } from './entities/user.entity';
import { UserDetailsOutputDTO } from './dtos/user-details.output.dto';

export class UserMapper {
	public static toDetailsDTO(user: User): UserDetailsOutputDTO {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			name: user.name,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
