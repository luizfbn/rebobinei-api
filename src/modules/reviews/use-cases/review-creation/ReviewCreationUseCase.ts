import { env } from '../../../../core/config/env';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserAlreadyReviewedError } from '../../../../core/errors/user-already-reviewed-error';
import { MoviesProvider } from '../../../movies/providers/movies.provider.interface';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewCreationInputDTO } from './review-creation.schema';
import { t } from '../../../../core/i18n';

export class ReviewCreationUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private moviesRepository: MoviesRepository,
		private moviesProvider: MoviesProvider
	) {}

	async execute({ tmdbId, userId, rating, comment }: ReviewCreationInputDTO) {
		const movie = await this.findOrCreateMovie(tmdbId);

		const reviewAlreadyExists =
			await this.reviewsRepository.findByUserAndMovieId(userId, movie.id);

		if (reviewAlreadyExists) {
			throw new UserAlreadyReviewedError();
		}

		await this.reviewsRepository.create({
			rating,
			comment: comment ?? null,
			userId,
			movieId: movie.id,
		});
	}

	private async findOrCreateMovie(id: number) {
		let movie = await this.moviesRepository.findByTmdbId(id);

		if (!movie) {
			const movieFromApi = await this.moviesProvider.getDetailsById({
				id,
				language: env.LOCALE,
			});

			if (!movieFromApi) {
				throw new ResourceNotFoundError(t('movieNotFound'));
			}

			movie = await this.moviesRepository.create(movieFromApi);
		}
		return movie;
	}
}
