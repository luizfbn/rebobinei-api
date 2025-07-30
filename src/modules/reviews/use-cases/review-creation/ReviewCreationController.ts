import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewCreationUseCase } from './ReviewCreationUseCase';
import { ReviewCreationRoute } from './review-creation.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserAlreadyReviewedError } from '../../../../core/errors/user-already-reviewed-error';

export class ReviewCreationController {
	constructor(private reviewCreationUseCase: ReviewCreationUseCase) {}

	async handle(
		request: FastifyRequest<ReviewCreationRoute>,
		reply: FastifyReply
	) {
		try {
			const { id: tmdbId } = request.params;
			const { rating, comment } = request.body;
			const userId = request.user.sub;

			await this.reviewCreationUseCase.execute({
				tmdbId,
				rating,
				comment,
				userId,
			});

			return reply.code(201).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}
			if (error instanceof UserAlreadyReviewedError) {
				return reply.code(409).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
