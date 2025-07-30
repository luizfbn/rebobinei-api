import { prisma } from '../prisma.service';
import { Prisma, Review as PrismaReview } from '@prisma/client';
import {
	FilterOptions,
	FindManyParams,
	ReviewsRepository,
} from '../../../../modules/reviews/repositories/reviews.repository.interface';
import { ReviewCreateInputDTO } from '../../../../modules/reviews/repositories/reviews.repository.types';
import {
	isRating,
	Rating,
} from '../../../../modules/reviews/schemas/rating.schema';
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

	async delete(id: string) {
		await prisma.review.delete({ where: { id } });
	}

	async findById(id: string) {
		const review = await prisma.review.findUnique({ where: { id } });

		if (!review) {
			return null;
		}

		return this.toEntity(review);
	}

	async findDetailsById(id: string) {
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

	async findMany(params: FindManyParams) {
		const { page, limit, orderBy, filter } = params;

		const where: Prisma.ReviewWhereInput = {};

		if (filter?.rating) {
			where.rating = filter.rating;
		}

		const reviews = await prisma.review.findMany({
			where,
			orderBy,
			take: limit,
			skip: (page - 1) * limit,
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

		return reviews.map((review) => ({
			id: review.id,
			rating: review.rating as Rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			user: review.user,
			movie: review.movie,
		}));
	}

	async findManyByMovieId(movieId: string, params: FindManyParams) {
		const { page, limit, orderBy, filter } = params;

		const where: Prisma.ReviewWhereInput = {
			movieId,
		};

		if (filter?.rating) {
			where.rating = filter.rating;
		}

		const reviews = await prisma.review.findMany({
			where,
			orderBy,
			take: limit,
			skip: (page - 1) * limit,
			include: {
				user: {
					select: {
						id: true,
						name: true,
						username: true,
					},
				},
			},
		});

		return reviews.map((review) => ({
			id: review.id,
			rating: review.rating as Rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			user: review.user,
		}));
	}

	async findManyByUserId(userId: string, params: FindManyParams) {
		const { page, limit, orderBy, filter } = params;

		const where: Prisma.ReviewWhereInput = {
			userId,
		};

		if (filter?.rating) {
			where.rating = filter.rating;
		}

		const reviews = await prisma.review.findMany({
			where,
			orderBy,
			take: limit,
			skip: (page - 1) * limit,
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
			},
		});

		return reviews.map((review) => ({
			id: review.id,
			rating: review.rating as Rating,
			comment: review.comment,
			createdAt: review.createdAt,
			updatedAt: review.updatedAt,
			movie: review.movie,
		}));
	}

	async count(filter: FilterOptions) {
		const where: Prisma.ReviewWhereInput = {};
		if (filter.userId) where.userId = filter.userId;
		if (filter.movieId) where.movieId = filter.movieId;
		if (filter.rating) where.rating = filter.rating;

		return await prisma.review.count({ where });
	}

	async getRatingStatsByMovieId(movieId: string) {
		const [stats, groupByRating] = await Promise.all([
			prisma.review.aggregate({
				where: { movieId },
				_avg: {
					rating: true,
				},
				_count: {
					_all: true,
				},
			}),
			prisma.review.groupBy({
				by: ['rating'],
				where: { movieId },
				_count: {
					rating: true,
				},
			}),
		]);

		return {
			average: stats._avg.rating || 0,
			totalCount: stats._count._all,
			countsByRating: groupByRating.map((item) => ({
				rating: item.rating as Rating,
				count: item._count.rating,
			})),
		};
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
