import { z } from 'zod';
import { tmdbPaginationSchema } from '../../../../core/schemas/tmdb-pagination.schema';

const querySchema = tmdbPaginationSchema.extend({
	category: z.enum(['popular', 'trending', 'upcoming']).default('popular'),
});

export const movieListRouteSchema = {
	querystring: querySchema,
};

export interface MovieListRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type MovieListInputDTO = z.infer<typeof querySchema>;
