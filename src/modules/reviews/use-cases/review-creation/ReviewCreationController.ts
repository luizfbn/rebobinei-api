import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewCreationUseCase } from './ReviewCreationUseCase';
import { ReviewCreationRoute } from './review-creation.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class ReviewCreationController {
	constructor(private reviewCreationUseCase: ReviewCreationUseCase) {}

	async handle(
		request: FastifyRequest<ReviewCreationRoute>,
		reply: FastifyReply
	) {
		const { tmdbMovieId } = request.params;
		const { rating, comment } = request.body;
		const userId = request.user.sub;

		try {
			await this.reviewCreationUseCase.execute({
				tmdbMovieId,
				rating,
				comment,
				userId,
			});

			return reply.status(201).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
