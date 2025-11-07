import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { Role } from '../../../../core/types/roles.type';

const paramsSchema = z.object({
	id: z.string().min(1, { error: t('invalidIdParam') }),
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
