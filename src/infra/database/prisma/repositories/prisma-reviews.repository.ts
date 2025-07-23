import { prisma } from '../prisma.service';
import { ReviewsRepository } from '../../../../modules/reviews/repositories/reviews.repository.interface';
import { ReviewCreateInputDTO } from '../../../../modules/reviews/dtos/review-create.input.dto';

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
}
