import { ReviewWithDetails } from './repositories/reviews.repository.types';
import { ReviewDetailsOutputDTO } from './dtos/review-details.output.dto';

export class ReviewMapper {
	public static toDetailsDTO(
		review: ReviewWithDetails
	): ReviewDetailsOutputDTO {
		return {
			id: review.id,
			rating: review.rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			user: review.user,
			movie: {
				tmdbId: review.movie.tmdbId,
				title: review.movie.title,
				originalTitle: review.movie.originalTitle,
				overview: review.movie.overview,
				posterUrl: review.movie.posterPath
					? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/w500${
							review.movie.posterPath
					  }`
					: null,
				backdropUrl: review.movie.backdropPath
					? `${process.env.TMDB_IMAGE_BASE_URL ?? ''}/original${
							review.movie.backdropPath
					  }`
					: null,
			},
		};
	}
}
