import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.string().nonempty({ error: t('invalidReviewId') }),
});

export const reviewDetailsRouteSchema = {
	params: paramsSchema,
};

export interface ReviewDetailsRoute {
	Params: z.infer<typeof paramsSchema>;
}

export type ReviewDetailsInputDTO = z.infer<typeof paramsSchema>;
