export const userEmailChangeBodySchema = {
	type: 'object',
	properties: {
		password: { type: 'string', minLength: 6 },
		newEmail: { type: 'string', format: 'email' },
	},
	required: ['newEmail', 'password'],
} as const;

export interface UserEmailChangeInputDTO {
	userId: string;
	password: string;
	newEmail: string;
}
