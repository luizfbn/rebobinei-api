import { z } from 'zod';
import { t } from '../../../../core/i18n';

const querySchema = z.object({
	userId: z.string().nonempty({ error: t('invalidUserId') }),
	movieId: z.coerce
		.number()
		.int()
		.positive({ error: t('movieIdPositive') }),
});

export const reviewDetailsByUserAndMovieRouteSchema = {
	querystring: querySchema,
};

export interface ReviewDetailsByUserAndMovieRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type ReviewDetailsByUserAndMovieInputDTO = z.infer<typeof querySchema>;
