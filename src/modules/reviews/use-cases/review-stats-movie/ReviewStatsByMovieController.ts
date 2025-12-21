import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewStatsByMovieUseCase } from './ReviewStatsByMovieUseCase';
import { ReviewStatsByMovieRoute } from './review-stats-movie.schema';
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
			console.error(error);
			return reply.code(500).send({ message: t('internalError') });
		}
	}
}
