import { z } from 'zod';
import { paginationSchema } from '../../../../core/schemas/pagination.schema';
import { sortSchema } from '../../schemas/sort.schema';
import { ratingQuerySchema } from '../../schemas/rating.schema';

const paramsSchema = z.object({
	id: z.string().min(1, { error: 'Invalid id parameter.' }),
});

const querySchema = paginationSchema.extend({
	sort: sortSchema,
	rating: ratingQuerySchema.optional(),
});

export const reviewListByUserSchema = {
	params: paramsSchema,
	querystring: querySchema,
};

export interface ReviewListByUserRoute {
	Params: z.infer<typeof paramsSchema>;
	Querystring: z.infer<typeof querySchema>;
}

export const reviewListByAuthenticatedUserSchema = {
	querystring: querySchema,
};

export interface ReviewListByAuthenticatedUserRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type ReviewListByUserInputDTO = z.infer<typeof paramsSchema> &
	z.infer<typeof querySchema>;
