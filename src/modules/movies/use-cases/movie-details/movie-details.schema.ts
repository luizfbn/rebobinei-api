import { z } from 'zod';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: 'Movie ID must be a positive number.' }),
});

export const movieDetailsRouteSchema = {
	params: paramsSchema,
};

export interface MovieDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type MovieDetailsInputDTO = z.infer<typeof paramsSchema>;
