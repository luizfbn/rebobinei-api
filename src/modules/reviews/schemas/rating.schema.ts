import { z } from 'zod';
import { t } from '../../../core/i18n';

export const ratingBodySchema = z.union(
	[z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)],
	{
		error: t('ratingMustBeInteger1To5'),
	}
);

export const ratingQuerySchema = z.coerce
	.number({ error: t('ratingRequiredNumber') })
	.int({ error: t('ratingMustBeInteger') })
	.min(1, { error: t('ratingMin') })
	.max(5, { error: t('ratingMax') });

export type Rating = z.infer<typeof ratingBodySchema>;

export function isRating(value: number): value is Rating {
	if (!Number.isInteger(value)) {
		return false;
	}
	return value >= 1 && value <= 5;
}
