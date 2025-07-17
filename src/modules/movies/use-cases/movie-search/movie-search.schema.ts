import { z } from 'zod';
import { paginationSchema } from '../../schemas/pagination.schema';
import { languageSchema } from '../../schemas/language.schema';

const querySchema = paginationSchema.extend({
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
