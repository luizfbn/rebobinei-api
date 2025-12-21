import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewListByMovieUseCase } from './ReviewListByMovieUseCase';
import { ReviewListByMovieRoute } from './review-list-movie.schema';
import { t } from '../../../../core/i18n';

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
			console.error(error);
			return reply.code(500).send({ message: t('internalError') });
		}
	}
}
