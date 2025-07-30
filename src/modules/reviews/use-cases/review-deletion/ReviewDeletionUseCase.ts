import { PermissionDeniedError } from '../../../../core/errors/permission-denied-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewDeletionInputDTO } from './review-deletion.schema';

export class ReviewDeletionUseCase {
	constructor(private reviewsRepository: ReviewsRepository) {}

	async execute({ id, userId, userRole }: ReviewDeletionInputDTO) {
		const review = await this.reviewsRepository.findById(id);

		if (!review) {
			throw new ResourceNotFoundError('Review not found.');
		}

		const isOwner = userId === review.userId;
		const isAdmin = userRole === 'ADMIN';

		if (!isOwner && !isAdmin) {
			throw new PermissionDeniedError();
		}

		await this.reviewsRepository.delete(id);
	}
}
