import { ReviewCreateInputDTO } from '../dtos/review-create.input.dto';

export interface ReviewsRepository {
	create(review: ReviewCreateInputDTO): Promise<void>;
}
