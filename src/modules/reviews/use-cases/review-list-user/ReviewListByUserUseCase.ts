import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../../users/repositories/users.repository.interface';
import { ReviewWithMovieOutputDTO } from '../../dtos/review-with-movie.output.dto';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { ReviewListByUserInputDTO } from './review-list-user.schema';

export class ReviewListByUserUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		id: userId,
		page,
		limit,
	}: ReviewListByUserInputDTO): Promise<
		PaginatedOutputDTO<ReviewWithMovieOutputDTO>
	> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const [reviews, totalResults] = await Promise.all([
			this.reviewsRepository.findManyByUserId(user.id, { page, limit }),
			this.reviewsRepository.countByUserId(user.id),
		]);

		const reviewsDto = reviews.map(ReviewMapper.toReviewWithMovieDTO);
		const totalPages = Math.ceil(totalResults / limit);

		return {
			page,
			totalPages: totalPages,
			totalResults: totalResults,
			data: reviewsDto,
		};
	}
}
