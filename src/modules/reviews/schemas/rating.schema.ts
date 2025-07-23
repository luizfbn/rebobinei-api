import { z } from 'zod';

export const RatingSchema = z.union(
	[z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)],
	{
		error: 'The rating must be an integer from 1 to 5.',
	}
);
