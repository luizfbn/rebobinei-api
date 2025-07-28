import { Review } from '../entities/review.entity';
import { Rating } from '../schemas/rating.schema';

import {
	ReviewCreateInputDTO,
	ReviewWithUser,
	ReviewWithDetails,
	ReviewWithMovie,
} from './reviews.repository.types';

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface FindManyParams extends PaginationParams {
	orderBy: {
		[key: string]: 'asc' | 'desc';
	};
	filter?: {
		rating?: Rating;
	};
}

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Review | null>;
	findDetailsById(id: string): Promise<ReviewWithDetails | null>;
	findByUserAndMovieId(userId: string, movieId: string): Promise<Review | null>;
	findMany(params: FindManyParams): Promise<ReviewWithDetails[]>;
	findManyByMovieId(
		movieId: string,
		params: PaginationParams
	): Promise<ReviewWithUser[]>;
	findManyByUserId(
		userId: string,
		params: PaginationParams
	): Promise<ReviewWithMovie[]>;
	countAll(): Promise<number>;
	countByMovieId(movieId: string): Promise<number>;
	countByUserId(userId: string): Promise<number>;
}
