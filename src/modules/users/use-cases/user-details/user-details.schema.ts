import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.string().nonempty({ error: t('invalidUserId') }),
});

export const userDetailsRouteSchema = {
	params: paramsSchema,
};

export interface UserDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type UserDetailsInputDTO = z.infer<typeof paramsSchema>;
