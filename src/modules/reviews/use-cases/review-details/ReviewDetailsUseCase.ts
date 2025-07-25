import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { ReviewDetailsInputDTO } from './review-details.schema';

export class ReviewDetailsUseCase {
	constructor(private reviewsRepository: ReviewsRepository) {}

	async execute({ id }: ReviewDetailsInputDTO) {
		const review = await this.reviewsRepository.findDetailsById(id);

		if (!review) {
			throw new ResourceNotFoundError('Review not found.');
		}

		return ReviewMapper.toDetailsDTO(review);
	}
}
