import { Role } from '../../../core/types/roles.type';

export interface UserDetailsOutputDTO {
	email: string;
	id: string;
	username: string;
	name: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
}
