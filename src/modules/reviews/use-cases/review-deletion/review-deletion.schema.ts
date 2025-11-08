import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { Role } from '../../../../core/types/roles.type';

const paramsSchema = z.object({
	id: z.string().nonempty({ error: t('invalidReviewId') }),
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
