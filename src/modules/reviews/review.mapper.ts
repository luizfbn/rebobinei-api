import { Review as PrismaReview } from '@prisma/client';
import { Review } from './entities/review.entity';
import { isRating } from './types/rating.type';
import { ReviewWithDetails } from './repositories/reviews.repository.types';
import { ReviewDetailsOutputDTO } from './dtos/review-details.output.dto';

export class ReviewMapper {
	public static toEntity(review: PrismaReview) {
		const { rating } = review;

		if (!isRating(rating)) {
			console.error(
				`Invalid rating found in the database: ${rating} for review ID ${review.id}`
			);
			throw new Error('Invalid rating data in persistence.');
		}

		const reviewProps = {
			id: review.id,
			userId: review.userId,
			movieId: review.movieId,
			rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
		};

		return Review.create(reviewProps);
	}

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
