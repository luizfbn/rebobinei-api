import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { paginationSchema } from '../../../../core/schemas/pagination.schema';
import { sortSchema } from '../../schemas/sort.schema';
import { ratingQuerySchema } from '../../schemas/rating.schema';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: t('movieIdPositive') }),
});

const querySchema = paginationSchema.extend({
	sort: sortSchema,
	rating: ratingQuerySchema.optional(),
});

export const reviewListByMovieSchema = {
	params: paramsSchema,
	querystring: querySchema,
};

export interface ReviewListByMovieRoute {
	Params: z.infer<typeof paramsSchema>;
	Querystring: z.infer<typeof querySchema>;
}

export type ReviewListByMovieInputDTO = z.infer<typeof paramsSchema> &
	z.infer<typeof querySchema>;
