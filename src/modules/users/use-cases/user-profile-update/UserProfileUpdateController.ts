import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';
import { UserProfileUpdateUseCase } from './UserProfileUpdateUseCase';
import { UserProfileUpdateRoute } from './user-profile-update.schema';
import { t } from '../../../../core/i18n';

export class UserProfileUpdateController {
	constructor(private userProfileUpdateUseCase: UserProfileUpdateUseCase) {}

	async handle(
		request: FastifyRequest<UserProfileUpdateRoute>,
		reply: FastifyReply
	) {
		try {
			const { name, username } = request.body;

			const userId = request.user.sub;

			const updatedUser = await this.userProfileUpdateUseCase.execute({
				userId,
				name,
				username,
			});

			return reply.code(200).send(updatedUser);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}
			if (error instanceof UserAlreadyExistsError) {
				return reply.code(409).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
