import { Role } from '../../../core/types/roles.type';

interface IUser {
	id: string;
	email: string;
	username: string;
	name: string;
	password: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
}

export class User {
	public readonly id: string;
	public email: string;
	public username: string;
	public name: string;
	public password: string;
	public role: Role;
	public createdAt: Date;
	public updatedAt: Date;

	private constructor(props: IUser) {
		this.id = props.id;
		this.email = props.email;
		this.username = props.username;
		this.name = props.name;
		this.password = props.password;
		this.role = props.role;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public static create(props: IUser) {
		return new User(props);
	}
}
