import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.string().nonempty({ error: t('invalidUserId') }),
});

export const userProfileRouteSchema = {
	params: paramsSchema,
};

export interface UserProfileRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type UserProfileInputDTO = z.infer<typeof paramsSchema>;
