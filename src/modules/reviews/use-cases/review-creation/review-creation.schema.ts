import { z } from 'zod';
import { RatingSchema } from '../../schemas/rating.schema';

const paramsSchema = z.object({
	tmdbMovieId: z.coerce.number().int().positive(),
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

export type ReviewCreationInputDTO = z.infer<typeof bodySchema> &
	z.infer<typeof paramsSchema> & {
		userId: string;
	};
