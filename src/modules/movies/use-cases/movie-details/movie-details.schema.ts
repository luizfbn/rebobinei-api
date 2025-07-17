import { z } from 'zod';
import { languageSchema } from '../../schemas/language.schema';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: 'Movie ID must be a positive number.' }),
});

const querySchema = z.object({
	language: languageSchema,
});

export const movieDetailsRouteSchema = {
	params: paramsSchema,
	querystring: querySchema,
};

export interface MovieDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
	Querystring: z.infer<typeof querySchema>;
}

export type MovieDetailsInputDTO = z.infer<typeof paramsSchema> &
	z.infer<typeof querySchema>;
