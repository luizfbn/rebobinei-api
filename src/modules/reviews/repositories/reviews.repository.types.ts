import { Review } from '../entities/review.entity';
import { Rating } from '../schemas/rating.schema';

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

export interface ReviewRatingStats {
	average: number;
	totalCount: number;
	countsByRating: {
		rating: Rating;
		count: number;
	}[];
}

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
