import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
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
			return ReviewMapper.toRatingStatsDTO({
				average: 0,
				countsByRating: [],
				totalCount: 0,
			});
		}

		const stats = await this.reviewsRepository.getRatingStatsByMovieId(
			movie.id
		);

		return ReviewMapper.toRatingStatsDTO(stats);
	}
}
