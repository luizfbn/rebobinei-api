import {
	ReviewWithUser,
	ReviewWithDetails,
	ReviewWithMovie,
	ReviewRatingStats,
} from './repositories/reviews.repository.types';
import { ReviewDetailsOutputDTO } from './dtos/review-details.output.dto';
import { ReviewWithAuthorOutputDTO } from './dtos/review-with-author.output.dto';
import { ReviewWithMovieOutputDTO } from './dtos/review-with-movie.output.dto';
import { ReviewStatsByMovieOutputDTO } from './dtos/review-stats-movie.output.dto';

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

	public static toReviewWithAuthorDTO(
		review: ReviewWithUser
	): ReviewWithAuthorOutputDTO {
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

	public static toReviewWithMovieDTO(
		review: ReviewWithMovie
	): ReviewWithMovieOutputDTO {
		return {
			id: review.id,
			rating: review.rating,
			comment: review.comment,
			createdAt: review.createdAt,
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

	public static toRatingStatsDTO(
		stats: ReviewRatingStats
	): ReviewStatsByMovieOutputDTO {
		const initialCounts: ReviewStatsByMovieOutputDTO['counts'] = {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
		};
		const counts = stats.countsByRating.reduce((acc, current) => {
			acc[current.rating as keyof typeof acc] = current.count;
			return acc;
		}, initialCounts);

		return {
			average: stats.average,
			totalCount: stats.totalCount,
			counts,
		};
	}
}
