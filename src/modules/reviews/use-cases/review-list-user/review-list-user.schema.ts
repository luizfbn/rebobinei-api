import { z } from 'zod';
import { paginationSchema } from '../../../../core/schemas/pagination.schema';

const paramsSchema = z.object({
	id: z.string().min(1, { error: 'Invalid id parameter.' }),
});

export const reviewListByUserSchema = {
	params: paramsSchema,
	querystring: paginationSchema,
};

export interface ReviewListByUserRoute {
	Params: z.infer<typeof paramsSchema>;
	Querystring: z.infer<typeof paginationSchema>;
}

export const reviewListByAuthenticatedUserSchema = {
	querystring: paginationSchema,
};

export interface ReviewListByAuthenticatedUserRoute {
	Querystring: z.infer<typeof paginationSchema>;
}

export type ReviewListByUserInputDTO = z.infer<typeof paramsSchema> &
	z.infer<typeof paginationSchema>;
