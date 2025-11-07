import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.string().min(1, { error: t('invalidIdParam') }),
});

export const userDetailsRouteSchema = {
	params: paramsSchema,
};

export interface UserDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type UserDetailsInputDTO = z.infer<typeof paramsSchema>;
