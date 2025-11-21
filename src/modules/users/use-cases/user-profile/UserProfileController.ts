import { FastifyReply, FastifyRequest } from 'fastify';
import { UserProfileUseCase } from './UserProfileUseCase';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserProfileRoute } from './user-profile.schema';
import { t } from '../../../../core/i18n';

export class UserProfileController {
	constructor(private userProfileUseCase: UserProfileUseCase) {}

	async handle(request: FastifyRequest<UserProfileRoute>, reply: FastifyReply) {
		try {
			const { id } = request.params;

			const result = await this.userProfileUseCase.execute({ id });

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
