import { z } from 'zod';
import { t } from '../../../../core/i18n';

const bodySchema = z.object({
	password: z.string().nonempty({ error: t('invalidPassword') }),
});

export const userDeletionRouteSchema = {
	body: bodySchema,
};

export interface UserDeletionRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserDeletionInputDTO = z.infer<typeof bodySchema> & {
	userId: string;
};
