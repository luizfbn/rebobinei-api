import { z } from 'zod';
import { Role } from '../../../../core/types/roles.type';

const paramsSchema = z.object({
	id: z.string().min(1, { error: 'Invalid id parameter.' }),
});

export const reviewDeletionRouteSchema = {
	params: paramsSchema,
};

export interface ReviewDeletionRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type ReviewDeletionInputDTO = z.infer<typeof paramsSchema> & {
	userId: string;
	userRole: Role;
};
