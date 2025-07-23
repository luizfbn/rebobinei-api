import { Review as PrismaReview } from '@prisma/client';
import { Review } from './entities/review.entity';
import { isRating } from './types/rating.type';

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
}
