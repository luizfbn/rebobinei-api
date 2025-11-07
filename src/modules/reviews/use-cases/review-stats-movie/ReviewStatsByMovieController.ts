import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewStatsByMovieUseCase } from './ReviewStatsByMovieUseCase';
import { ReviewStatsByMovieRoute } from './review-stats-movie.schema';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { t } from '../../../../core/i18n';

export class ReviewStatsByMovieController {
	constructor(private reviewStatsByMovieUseCase: ReviewStatsByMovieUseCase) {}

	async handle(
		request: FastifyRequest<ReviewStatsByMovieRoute>,
		reply: FastifyReply
	) {
		try {
			const { id } = request.params;

			const result = await this.reviewStatsByMovieUseCase.execute({
				id,
			});

			return reply.code(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
