import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewListUseCase } from './ReviewListUseCase';
import { ReviewListRoute } from './review-list.schema';
import { t } from '../../../../core/i18n';

export class ReviewListController {
	constructor(private reviewListUseCase: ReviewListUseCase) {}

	async handle(request: FastifyRequest<ReviewListRoute>, reply: FastifyReply) {
		try {
			const { page, limit, sort, rating } = request.query;

			const result = await this.reviewListUseCase.execute({
				page,
				limit,
				sort,
				rating,
			});

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
