import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: t('movieIdPositive') }),
});

export const reviewStatsByMovieRouteSchema = {
	params: paramsSchema,
};

export interface ReviewStatsByMovieRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type ReviewStatsByMovieInputDTO = z.infer<typeof paramsSchema>;
