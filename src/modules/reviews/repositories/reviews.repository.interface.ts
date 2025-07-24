import { Review } from '../entities/review.entity';
import { ReviewCreateInputDTO } from './reviews.repository.types';

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	findByUserAndMovieId(userId: string, movieId: string): Promise<Review | null>;
}
