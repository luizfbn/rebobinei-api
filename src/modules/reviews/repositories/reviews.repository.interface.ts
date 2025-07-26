import { Review } from '../entities/review.entity';
import {
	ReviewCreateInputDTO,
	ReviewWithUser,
	ReviewWithDetails,
} from './reviews.repository.types';

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Review | null>;
	findDetailsById(id: string): Promise<ReviewWithDetails | null>;
	findByUserAndMovieId(userId: string, movieId: string): Promise<Review | null>;
	findManyByMovieId(
		movieId: string,
		params: PaginationParams
	): Promise<ReviewWithUser[]>;
	countByMovieId(movieId: string): Promise<number>;
}
