import { FastifyReply, FastifyRequest } from 'fastify';
import { UserEmailChangeUseCase } from './UserEmailChangeUseCase';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';
import { UserEmailChangeRoute } from './user-email-change.schema';

export class UserEmailChangeController {
	constructor(private userEmailChangeUseCase: UserEmailChangeUseCase) {}

	async handle(
		request: FastifyRequest<UserEmailChangeRoute>,
		reply: FastifyReply
	) {
		try {
			const { password, newEmail } = request.body;

			const userId = request.user.sub;

			await this.userEmailChangeUseCase.execute({ userId, password, newEmail });

			return reply.status(204).send();
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}
			if (error instanceof InvalidCredentialsError) {
				return reply.status(401).send({ error: error.message });
			}
			if (error instanceof UserAlreadyExistsError) {
				return reply.status(409).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
