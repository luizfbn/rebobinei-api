import { Review } from '../entities/review.entity';

export type ReviewCreateInputDTO = Omit<
	Review,
	'id' | 'createdAt' | 'updatedAt'
>;

export type ReviewWithDetails = Omit<Review, 'userId' | 'movieId'> & {
	user: {
		id: string;
		name: string;
		username: string;
	};
	movie: {
		tmdbId: number;
		title: string;
		originalTitle: string;
		overview: string;
		posterPath: string | null;
		backdropPath: string | null;
	};
};

export type ReviewWithUser = Omit<Review, 'userId' | 'movieId'> & {
	user: {
		id: string;
		name: string;
		username: string;
	};
};
