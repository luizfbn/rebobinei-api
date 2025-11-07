import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: t('movieIdPositive') }),
});

export const movieDetailsRouteSchema = {
	params: paramsSchema,
};

export interface MovieDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type MovieDetailsInputDTO = z.infer<typeof paramsSchema>;
