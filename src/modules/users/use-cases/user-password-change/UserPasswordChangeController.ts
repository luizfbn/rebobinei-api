import { FastifyRequest, FastifyReply } from 'fastify';
import { UserPasswordChangeUseCase } from './UserPasswordChangeUseCase';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserPasswordChangeRoute } from './user-password-change.schema';
import { t } from '../../../../core/i18n';

export class UserPasswordChangeController {
	constructor(private userPasswordChangeUseCase: UserPasswordChangeUseCase) {}

	async handle(
		request: FastifyRequest<UserPasswordChangeRoute>,
		reply: FastifyReply
	) {
		try {
			const { currentPassword, newPassword, passwordConfirmation } =
				request.body;

			if (newPassword !== passwordConfirmation) {
				return reply.code(400).send({
					error: 'The new password and confirmation do not match.',
				});
			}

			const userId = request.user.sub;

			await this.userPasswordChangeUseCase.execute({
				userId,
				currentPassword,
				newPassword,
			});

			return reply.code(204).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ message: error.message });
			}
			if (error instanceof InvalidCredentialsError) {
				return reply.code(401).send({ message: error.message });
			}

			console.error(error);
			return reply.code(500).send({ message: t('internalError') });
		}
	}
}
