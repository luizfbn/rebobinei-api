import {
	ReviewWithUser,
	ReviewWithDetails,
} from './repositories/reviews.repository.types';
import { ReviewDetailsOutputDTO } from './dtos/review-details.output.dto';
import { ReviewListItemOutputDTO } from './dtos/review-list-item.output.dto';

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
			author: {
				id: review.user.id,
				name: review.user.name,
				username: review.user.username,
			},
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

	public static toListItemDTO(review: ReviewWithUser): ReviewListItemOutputDTO {
		return {
			id: review.id,
			rating: review.rating,
			comment: review.comment,
			createdAt: review.createdAt,
			author: {
				id: review.user.id,
				name: review.user.name,
				username: review.user.username,
			},
		};
	}
}
