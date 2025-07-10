export const createUserBodySchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		username: { type: 'string', minLength: 2 },
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 6 },
	},
	required: ['name', 'username', 'email', 'password'],
} as const;

export interface CreateUserInputDTO {
	name: string;
	username: string;
	email: string;
	password: string;
}
