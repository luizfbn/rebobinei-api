import { z } from 'zod';

export const ratingBodySchema = z.union(
	[z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)],
	{
		error: 'Rating must be an integer from 1 to 5.',
	}
);

export const ratingQuerySchema = z.coerce
	.number({ error: 'Rating must be a number.' })
	.int({ error: 'Rating must be an integer.' })
	.min(1, { error: 'The minimum rating is 1.' })
	.max(5, { error: 'The maximum rating is 5.' });

export type Rating = z.infer<typeof ratingBodySchema>;

export function isRating(value: number): value is Rating {
	if (!Number.isInteger(value)) {
		return false;
	}
	return value >= 1 && value <= 5;
}
