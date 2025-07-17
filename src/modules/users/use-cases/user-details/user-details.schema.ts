import { z } from 'zod';

const paramsSchema = z.object({
	id: z.string().min(1, { error: 'Invalid id parameter.' }),
});

export const userDetailsRouteSchema = {
	params: paramsSchema,
};

export interface UserDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type UserDetailsInputDTO = z.infer<typeof paramsSchema>;
