import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewListByMovieUseCase } from './ReviewListByMovieUseCase';
import { ReviewListByMovieRoute } from './review-list-movie.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class ReviewListByMovieController {
	constructor(private reviewListByMovieUseCase: ReviewListByMovieUseCase) {}

	async handle(
		request: FastifyRequest<ReviewListByMovieRoute>,
		reply: FastifyReply
	) {
		try {
			const { id } = request.params;
			const { page, limit, sort, rating } = request.query;

			const result = await this.reviewListByMovieUseCase.execute({
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
