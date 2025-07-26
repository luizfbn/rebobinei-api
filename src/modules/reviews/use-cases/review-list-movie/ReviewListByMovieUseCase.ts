import { PaginatedOutputDTO } from '../../../../core/dtos/paginated.output.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ReviewListItemOutputDTO } from '../../dtos/review-list-item.output.dto';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
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
	}: ReviewListByMovieInputDTO): Promise<
		PaginatedOutputDTO<ReviewListItemOutputDTO>
	> {
		const movie = await this.moviesRepository.findByTmdbId(tmdbId);

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		const [reviews, totalResults] = await Promise.all([
			this.reviewsRepository.findManyByMovieId(movie.id, { page, limit }),
			this.reviewsRepository.countByMovieId(movie.id),
		]);

		const reviewsDto = reviews.map(ReviewMapper.toListItemDTO);
		const totalPages = Math.ceil(totalResults / limit);

		return {
			page,
			totalPages: totalPages,
			totalResults: totalResults,
			data: reviewsDto,
		};
	}
}
