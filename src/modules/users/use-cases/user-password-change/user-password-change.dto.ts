export const userPasswordChangeBodySchema = {
	type: 'object',
	properties: {
		currentPassword: { type: 'string' },
		newPassword: { type: 'string', minLength: 6 },
		passwordConfirmation: { type: 'string', minLength: 6 },
	},
	required: ['currentPassword', 'newPassword', 'passwordConfirmation'],
} as const;

export interface UserPasswordChangeInputDTO {
	userId: string;
	currentPassword: string;
	newPassword: string;
}
