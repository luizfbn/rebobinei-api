import { prisma } from '../prisma.service';
import { Review as PrismaReview } from '@prisma/client';
import { ReviewsRepository } from '../../../../modules/reviews/repositories/reviews.repository.interface';
import { ReviewCreateInputDTO } from '../../../../modules/reviews/repositories/reviews.repository.types';
import {
	isRating,
	Rating,
} from '../../../../modules/reviews/types/rating.type';
import { Review } from '../../../../modules/reviews/entities/review.entity';

export class PrismaReviewsRepository implements ReviewsRepository {
	async create({ userId, movieId, rating, comment }: ReviewCreateInputDTO) {
		await prisma.review.create({
			data: {
				userId,
				movieId,
				rating,
				comment,
			},
		});
	}

	async findById(id: string) {
		const review = await prisma.review.findUnique({
			where: {
				id,
			},
			include: {
				movie: {
					select: {
						tmdbId: true,
						title: true,
						originalTitle: true,
						overview: true,
						posterPath: true,
						backdropPath: true,
					},
				},
				user: {
					select: {
						id: true,
						name: true,
						username: true,
					},
				},
			},
		});

		if (!review) {
			return null;
		}

		return {
			id: review.id,
			rating: review.rating as Rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			user: review.user,
			movie: review.movie,
		};
	}

	async findByUserAndMovieId(userId: string, movieId: string) {
		const review = await prisma.review.findUnique({
			where: {
				userId_movieId: {
					userId,
					movieId,
				},
			},
		});

		if (!review) {
			return null;
		}

		return this.toEntity(review);
	}

	private toEntity(review: PrismaReview) {
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
