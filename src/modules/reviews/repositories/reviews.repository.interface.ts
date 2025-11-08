import { Review } from '../entities/review.entity';
import { Rating } from '../schemas/rating.schema';
import {
	ReviewCreateInputDTO,
	ReviewWithUser,
	ReviewWithDetails,
	ReviewWithMovie,
	ReviewRatingStats,
} from './reviews.repository.types';

interface PaginationParams {
	page: number;
	limit: number;
}

export interface FilterOptions {
	userId?: string;
	movieId?: string;
	rating?: Rating;
}

export interface FindManyParams extends PaginationParams {
	orderBy: {
		[key: string]: 'asc' | 'desc';
	};
	filter: Omit<FilterOptions, 'userId' | 'movieId'>;
}

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Review | null>;
	findDetailsById(id: string): Promise<ReviewWithDetails | null>;
	findByUserAndMovieId(
		userId: string,
		movieId: string
	): Promise<ReviewWithDetails | null>;
	findMany(params: FindManyParams): Promise<ReviewWithDetails[]>;
	findManyByMovieId(
		movieId: string,
		params: FindManyParams
	): Promise<ReviewWithUser[]>;
	findManyByUserId(
		userId: string,
		params: FindManyParams
	): Promise<ReviewWithMovie[]>;
	count(filter: FilterOptions): Promise<number>;
	getRatingStatsByMovieId(movieId: string): Promise<ReviewRatingStats>;
}
