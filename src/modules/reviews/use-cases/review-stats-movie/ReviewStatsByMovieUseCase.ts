import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewStatsByMovieInputDTO } from './review-stats-movie.schema';
import { ReviewStatsByMovieOutputDTO } from '../../dtos/review-stats-movie.output.dto';
import { ReviewMapper } from '../../review.mapper';

export class ReviewStatsByMovieUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private moviesRepository: MoviesRepository
	) {}

	async execute({
		id: tmdbId,
	}: ReviewStatsByMovieInputDTO): Promise<ReviewStatsByMovieOutputDTO> {
		const movie = await this.moviesRepository.findByTmdbId(tmdbId);

		if (!movie) {
			throw new ResourceNotFoundError('Movie not found.');
		}

		const stats = await this.reviewsRepository.getRatingStatsByMovieId(
			movie.id
		);

		return ReviewMapper.toRatingStatsDTO(stats);
	}
}
