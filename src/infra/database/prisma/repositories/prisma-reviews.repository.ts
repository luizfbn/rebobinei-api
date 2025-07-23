import { prisma } from '../prisma.service';
import { ReviewsRepository } from '../../../../modules/reviews/repositories/reviews.repository.interface';
import { ReviewCreateInputDTO } from '../../../../modules/reviews/dtos/review-create.input.dto';
import { ReviewMapper } from '../../../../modules/reviews/review.mapper';

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

		return ReviewMapper.toEntity(review);
	}
}
