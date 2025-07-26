import { Review } from '../entities/review.entity';

export type ReviewCreateInputDTO = Omit<
	Review,
	'id' | 'createdAt' | 'updatedAt'
>;

export type ReviewWithDetails = BaseReview & {
	user: BaseUser;
	movie: BaseMovie;
};

export type ReviewWithUser = BaseReview & {
	user: BaseUser;
};

export type ReviewWithMovie = BaseReview & {
	movie: BaseMovie;
};

type BaseReview = Omit<Review, 'userId' | 'movieId'>;

type BaseUser = {
	id: string;
	name: string;
	username: string;
};

type BaseMovie = {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
};
