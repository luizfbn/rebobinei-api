import { FastifyReply, FastifyRequest } from 'fastify';
import { ReviewDeletionRoute } from './review-deletion.schema';
import { ReviewDeletionUseCase } from './ReviewDeletionUseCase';
import { PermissionDeniedError } from '../../../../core/errors/permission-denied-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { t } from '../../../../core/i18n';

export class ReviewDeletionController {
	constructor(private reviewDeletionUseCase: ReviewDeletionUseCase) {}

	async handle(
		request: FastifyRequest<ReviewDeletionRoute>,
		reply: FastifyReply
	) {
		try {
			const { id } = request.params;
			const { sub: userId, role: userRole } = request.user;

			await this.reviewDeletionUseCase.execute({
				id,
				userId,
				userRole,
			});

			return reply.code(204).send();
		} catch (error) {
			if (error instanceof PermissionDeniedError) {
				return reply.code(403).send({ error: error.message });
			}
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
