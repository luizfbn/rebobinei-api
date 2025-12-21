import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { passwordSchema } from '../../schemas/password.schema';

const bodySchema = z.object({
	currentPassword: z.string().nonempty({ error: t('invalidPassword') }),
	newPassword: passwordSchema(
		t('newPasswordMinLength'),
		t('newPasswordMaxLength')
	),
	passwordConfirmation: passwordSchema(
		t('passwordConfirmationMinLength'),
		t('passwordConfirmationMaxLength')
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
