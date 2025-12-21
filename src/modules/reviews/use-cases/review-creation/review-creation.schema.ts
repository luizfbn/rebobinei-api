import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { ratingBodySchema } from '../../schemas/rating.schema';

const paramsSchema = z.object({
	id: z.coerce
		.number()
		.int()
		.positive({ error: t('movieIdPositive') }),
});

const bodySchema = z.object({
	rating: ratingBodySchema,
	comment: z
		.string()
		.max(2000, { error: t('reviewMaxLength') })
		.nullable()
		.optional(),
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
