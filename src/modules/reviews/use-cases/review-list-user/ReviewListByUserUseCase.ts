import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UsersRepository } from '../../../users/repositories/users.repository.interface';
import { ReviewWithMovieOutputDTO } from '../../dtos/review-with-movie.output.dto';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { isRating } from '../../schemas/rating.schema';
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
		sort,
		rating,
	}: ReviewListByUserInputDTO): Promise<
		PaginatedOutputDTO<ReviewWithMovieOutputDTO>
	> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError('User not found.');
		}

		const [field, direction] = sort.split('_');
		const orderBy = { [field]: direction as 'asc' | 'desc' };

		const filter = {
			rating: rating && isRating(rating) ? rating : undefined,
		};

		const [reviews, totalResults] = await Promise.all([
			this.reviewsRepository.findManyByUserId(user.id, {
				page,
				limit,
				orderBy,
				filter,
			}),
			this.reviewsRepository.count({
				userId: user.id,
				...filter,
			}),
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
