import { z } from 'zod';
import { paginationSchema } from '../../../../core/schemas/pagination.schema';

const paramsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const reviewListByMovieSchema = {
	params: paramsSchema,
	querystring: paginationSchema,
};

export interface ReviewListByMovieRoute {
	Params: z.infer<typeof paramsSchema>;
	Querystring: z.infer<typeof paginationSchema>;
}

export type ReviewListByMovieInputDTO = z.infer<typeof paramsSchema> &
	z.infer<typeof paginationSchema>;
