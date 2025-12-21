import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewMapper } from '../../review.mapper';
import { ReviewDetailsByUserAndMovieInputDTO } from './review-details-user-movie.schema';

export class ReviewDetailsByUserAndMovieUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private moviesRepository: MoviesRepository
	) {}

	async execute({
		userId,
		movieId: tmdbId,
	}: ReviewDetailsByUserAndMovieInputDTO) {
		const movie = await this.moviesRepository.findByTmdbId(tmdbId);

		if (!movie) {
			return null;
		}

		const review = await this.reviewsRepository.findByUserAndMovieId(
			userId,
			movie.id
		);

		return review ? ReviewMapper.toDetailsDTO(review) : null;
	}
}
