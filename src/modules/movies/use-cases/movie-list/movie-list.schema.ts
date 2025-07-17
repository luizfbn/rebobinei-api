import { z } from 'zod';
import { languageSchema } from '../../schemas/language.schema';
import { paginationSchema } from '../../schemas/pagination.schema';

const querySchema = paginationSchema.extend({
	category: z.enum(['popular', 'trending', 'upcoming']).default('popular'),
	language: languageSchema,
});

export const movieListRouteSchema = {
	querystring: querySchema,
};

export interface MovieListRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type MovieListInputDTO = z.infer<typeof querySchema>;
