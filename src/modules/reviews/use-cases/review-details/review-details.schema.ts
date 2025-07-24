import { z } from 'zod';

const paramsSchema = z.object({
	id: z.string().min(1, { error: 'Invalid id parameter.' }),
});

export const reviewDetailsRouteSchema = {
	params: paramsSchema,
};

export interface ReviewDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type ReviewDetailsInputDTO = z.infer<typeof paramsSchema>;
