import { FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewListByUserUseCase } from './ReviewListByUserUseCase';
import { ReviewListByUserInputDTO } from './review-list-user.schema';

export class ReviewListByUserController {
	constructor(private reviewListByUserUseCase: ReviewListByUserUseCase) {}

	async handle(
		{ id, page, limit, sort, rating }: ReviewListByUserInputDTO,
		reply: FastifyReply
	) {
		try {
			const result = await this.reviewListByUserUseCase.execute({
				id,
				page,
				limit,
				sort,
				rating,
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
