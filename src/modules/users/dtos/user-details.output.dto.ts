import { Role } from '../../../core/types/roles.type';

export interface UserDetailsOutputDTO {
	id: string;
	email: string;
	username: string;
	name: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
}
