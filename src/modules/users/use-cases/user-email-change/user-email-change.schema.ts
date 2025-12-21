import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { emailSchema } from '../../schemas/email.schema';

const bodySchema = z.object({
	password: z.string().nonempty({ error: t('invalidPassword') }),
	newEmail: emailSchema,
});

export const userEmailChangeRouteSchema = {
	body: bodySchema,
};

export interface UserEmailChangeRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserEmailChangeInputDTO = z.infer<typeof bodySchema> & {
	userId: string;
};
