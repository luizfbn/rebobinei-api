import { z } from 'zod';
import { passwordSchema } from '../../schemas/password.schema';

const bodySchema = z.object({
	currentPassword: passwordSchema(),
	newPassword: passwordSchema(
		'The new password must be at least 6 characters long.'
	),
	passwordConfirmation: passwordSchema(
		'The password confirmation must be at least 6 characters long.'
	),
});

export const userPasswordChangeRouteSchema = {
	body: bodySchema,
};

export interface UserPasswordChangeRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserPasswordChangeInputDTO = Omit<
	z.infer<typeof bodySchema>,
	'passwordConfirmation'
> & {
	userId: string;
};
