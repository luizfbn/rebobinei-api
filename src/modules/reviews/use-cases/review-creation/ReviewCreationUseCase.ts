import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { MoviesProvider } from '../../../movies/providers/movies.provider.interface';
import { MoviesRepository } from '../../../movies/repositories/movies.repository.interface';
import { ReviewsRepository } from '../../repositories/reviews.repository.interface';
import { ReviewCreationInputDTO } from './review-creation.schema';

export class ReviewCreationUseCase {
	constructor(
		private reviewsRepository: ReviewsRepository,
		private moviesRepository: MoviesRepository,
		private moviesProvider: MoviesProvider
	) {}

	async execute({
		tmdbMovieId,
		userId,
		rating,
		comment,
	}: ReviewCreationInputDTO) {
		let movie = await this.moviesRepository.findByTmdbId(tmdbMovieId);

		if (!movie) {
			const movieFromApi = await this.moviesProvider.getDetailsById({
				id: tmdbMovieId,
				language: 'en-US',
			});

			if (!movieFromApi) {
				throw new ResourceNotFoundError('Movie not found on TMDB.');
			}

			movie = await this.moviesRepository.create(movieFromApi);
		}

		await this.reviewsRepository.create({
			rating,
			comment: comment ?? null,
			userId,
			movieId: movie.id,
		});
	}
}
