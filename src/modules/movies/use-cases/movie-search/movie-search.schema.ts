import { z } from 'zod';
import { languageSchema } from '../../schemas/language.schema';
import { tmdbPaginationSchema } from '../../../../core/schemas/tmdb-pagination.schema';

const querySchema = tmdbPaginationSchema.extend({
	query: z.string().min(1, { error: 'Invalid query parameter.' }),
	language: languageSchema,
});

export const movieSearchRouteSchema = {
	querystring: querySchema,
};

export interface MovieSearchRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type MovieSearchInputDTO = z.infer<typeof querySchema>;
