export const userCreationBodySchema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1, maxLength: 50, pattern: '.*\\S.*' },
		username: {
			type: 'string',
			minLength: 3,
			maxLength: 15,
			pattern: '^[a-zA-Z0-9_]+$',
		},
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 6 },
	},
	required: ['name', 'username', 'email', 'password'],
} as const;

export interface UserCreationInputDTO {
	name: string;
	username: string;
	email: string;
	password: string;
}
