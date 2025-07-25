import { Review } from '../entities/review.entity';
import {
	ReviewCreateInputDTO,
	ReviewWithDetails,
} from './reviews.repository.types';

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<Review | null>;
	findDetailsById(id: string): Promise<ReviewWithDetails | null>;
	findByUserAndMovieId(userId: string, movieId: string): Promise<Review | null>;
}
