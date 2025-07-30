import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { ReviewDetailsOutputDTO } from '../../dtos/review-details.output.dto';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { isRating } from '../../schemas/rating.schema';
import { ReviewListInputDTO } from './review-list.schema';

export class ReviewListUseCase {
	constructor(private reviewsRepository: ReviewsRepository) {}

	async execute({
		page,
		limit,
		sort,
		rating,
	}: ReviewListInputDTO): Promise<PaginatedOutputDTO<ReviewDetailsOutputDTO>> {
		const [field, direction] = sort.split('_');
		const orderBy = { [field]: direction as 'asc' | 'desc' };

		const filter = {
			rating: rating && isRating(rating) ? rating : undefined,
		};

		const [reviews, totalResults] = await Promise.all([
			this.reviewsRepository.findMany({
				page,
				limit,
				orderBy,
				filter,
			}),
			this.reviewsRepository.count(filter),
		]);

		const reviewsDto = reviews.map(ReviewMapper.toDetailsDTO);
		const totalPages = Math.ceil(totalResults / limit);

		return {
			page,
			totalPages: totalPages,
			totalResults: totalResults,
			data: reviewsDto,
		};
	}
}
