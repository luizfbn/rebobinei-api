import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ReviewWithAuthorOutputDTO } from '../../dtos/review-with-author.output.dto';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { isRating } from '../../schemas/rating.schema';
import { ReviewListByMovieInputDTO } from './review-list-movie.schema';

export class ReviewListByMovieUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private moviesRepository: MoviesRepository
	) {}

	async execute({
		id: tmdbId,
		page,
		limit,
		sort,
		rating,
	}: ReviewListByMovieInputDTO): Promise<
		PaginatedOutputDTO<ReviewWithAuthorOutputDTO>
	> {
		const movie = await this.moviesRepository.findByTmdbId(tmdbId);

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		const [field, direction] = sort.split('_');
		const orderBy = { [field]: direction as 'asc' | 'desc' };

		const filter = {
			rating: rating && isRating(rating) ? rating : undefined,
		};

		const [reviews, totalResults] = await Promise.all([
			this.reviewsRepository.findManyByMovieId(movie.id, {
				page,
				limit,
				orderBy,
				filter,
			}),
			this.reviewsRepository.count({
				movieId: movie.id,
				...filter,
			}),
		]);

		const reviewsDto = reviews.map(ReviewMapper.toReviewWithAuthorDTO);
		const totalPages = Math.ceil(totalResults / limit);

		return {
			page,
			totalPages: totalPages,
			totalResults: totalResults,
			data: reviewsDto,
		};
	}
}
