import { z } from 'zod';
import { paginationSchema } from '../../../../core/schemas/pagination.schema';
import { sortSchema } from '../../schemas/sort.schema';
import { ratingQuerySchema } from '../../schemas/rating.schema';

const querySchema = paginationSchema.extend({
	sort: sortSchema,
	rating: ratingQuerySchema.optional(),
});

export const reviewListRouteSchema = {
	querystring: querySchema,
};

export interface ReviewListRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type ReviewListInputDTO = z.infer<typeof querySchema>;
