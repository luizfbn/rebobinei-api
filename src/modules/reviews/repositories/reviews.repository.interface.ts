import { ReviewCreateInputDTO } from '../dtos/review-create.input.dto';
import { Review } from '../entities/review.entity';

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
	findByUserAndMovieId(userId: string, movieId: string): Promise<Review | null>;
}
