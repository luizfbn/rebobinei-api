import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { ReviewDetailsByUserAndMovieRoute } from './review-details-user-movie.schema';
import { ReviewDetailsByUserAndMovieUseCase } from './ReviewDetailsByUserAndMovieUseCase';
import { t } from '../../../../core/i18n';

export class ReviewDetailsByUserAndMovieController {
	constructor(
		private reviewDetailsByUserAndMovieUseCase: ReviewDetailsByUserAndMovieUseCase
	) {}

	async handle(
		request: FastifyRequest<ReviewDetailsByUserAndMovieRoute>,
		reply: FastifyReply
	) {
		try {
			const { userId, movieId } = request.query;

			const result = await this.reviewDetailsByUserAndMovieUseCase.execute({
				userId,
				movieId,
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
