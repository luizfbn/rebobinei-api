import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewDetailsUseCase } from './ReviewDetailsUseCase';
import { ReviewDetailsRoute } from './review-details.schema';

export class ReviewDetailsController {
	constructor(private reviewDetailsUseCase: ReviewDetailsUseCase) {}

	async handle(
		request: FastifyRequest<ReviewDetailsRoute>,
		reply: FastifyReply
	) {
		try {
			const { id } = request.params;

			const result = await this.reviewDetailsUseCase.execute({
				id,
			});

			return reply.code(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
