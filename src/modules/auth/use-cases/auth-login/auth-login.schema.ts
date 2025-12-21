import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { emailSchema } from '../../../users/schemas/email.schema';

const bodySchema = z.object({
	email: emailSchema,
	password: z.string().nonempty({ error: t('invalidPassword') }),
});

export const authLoginRouteSchema = {
	body: bodySchema,
};

export interface AuthLoginRoute {
	Body: z.infer<typeof bodySchema>;
}

export type AuthLoginInputDTO = z.infer<typeof bodySchema>;
