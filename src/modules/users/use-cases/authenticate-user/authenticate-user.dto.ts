export const authenticateBodySchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 6 },
	},
	required: ['email', 'password'],
} as const;

export interface AuthenticateInputDTO {
	email: string;
	password: string;
}
