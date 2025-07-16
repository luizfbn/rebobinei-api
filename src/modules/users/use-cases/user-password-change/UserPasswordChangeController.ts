import { FastifyRequest, FastifyReply } from 'fastify';
import { UserPasswordChangeUseCase } from './UserPasswordChangeUseCase';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class UserPasswordChangeController {
	constructor(private userPasswordChangeUseCase: UserPasswordChangeUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { currentPassword, newPassword, passwordConfirmation } =
				request.body as {
					currentPassword: string;
					newPassword: string;
					passwordConfirmation: string;
				};

			if (newPassword !== passwordConfirmation) {
				return reply.status(400).send({
					error: 'The new password and confirmation do not match.',
				});
			}

			const userId = request.user.sub;

			await this.userPasswordChangeUseCase.execute({
				userId,
				currentPassword,
				newPassword,
			});

			return reply.status(204).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}
			if (error instanceof InvalidCredentialsError) {
				return reply.status(401).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
