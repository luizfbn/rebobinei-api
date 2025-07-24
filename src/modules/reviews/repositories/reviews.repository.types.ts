import { Review } from '../entities/review.entity';

export type ReviewCreateInputDTO = Omit<
	Review,
	'id' | 'createdAt' | 'updatedAt'
>;
