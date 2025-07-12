export const userAuthenticationBodySchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 6 },
	},
	required: ['email', 'password'],
} as const;

export interface UserAuthenticationInputDTO {
	email: string;
	password: string;
}
