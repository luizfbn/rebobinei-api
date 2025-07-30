import { z } from 'zod';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: 'Movie ID must be a positive number.' }),
});

export const reviewStatsByMovieRouteSchema = {
	params: paramsSchema,
};

export interface ReviewStatsByMovieRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type ReviewStatsByMovieInputDTO = z.infer<typeof paramsSchema>;
