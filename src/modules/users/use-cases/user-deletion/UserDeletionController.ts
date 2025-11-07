import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserDeletionUseCase } from './UserDeletionUseCase';
import { UserDeletionRoute } from './user-deletion.schema';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { t } from '../../../../core/i18n';

export class UserDeletionController {
	constructor(private userDeletionUseCase: UserDeletionUseCase) {}

	async handle(
		request: FastifyRequest<UserDeletionRoute>,
		reply: FastifyReply
	) {
		try {
			const { password } = request.body;
			const userId = request.user.sub;

			await this.userDeletionUseCase.execute({
				userId,
				password,
			});

			return reply.code(204).send();
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				return reply.code(401).send({ error: error.message });
			}
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
