import { FastifyReply, FastifyRequest } from 'fastify';
import { UserEmailChangeUseCase } from './UserEmailChangeUseCase';
import { UserEmailChangeInputDTO } from './user-email-change.dto';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class UserEmailChangeController {
	constructor(private userEmailChangeUseCase: UserEmailChangeUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { password, newEmail } = request.body as UserEmailChangeInputDTO;

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

			throw error;
		}
	}
}
