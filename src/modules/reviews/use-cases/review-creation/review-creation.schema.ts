import { z } from 'zod';
import { RatingSchema } from '../../schemas/rating.schema';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: 'Movie ID must be a positive number.' }),
});

const bodySchema = z.object({
	rating: RatingSchema,
	comment: z.string().nullable().optional(),
});

export const reviewCreationRouteSchema = {
	params: paramsSchema,
	body: bodySchema,
};

export interface ReviewCreationRoute {
	Params: z.infer<typeof paramsSchema>;
	Body: z.infer<typeof bodySchema>;
}

export type ReviewCreationInputDTO = z.infer<typeof bodySchema> & {
	tmdbId: number;
	userId: string;
};
