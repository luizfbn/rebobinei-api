import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthCurrentUserUseCase } from './AuthCurrentUserUseCase';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { t } from '../../../../core/i18n';

export class AuthCurrentUserController {
	constructor(private authCurrentUserUseCase: AuthCurrentUserUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const id = request.user.sub;

			const result = await this.authCurrentUserUseCase.execute({ id });

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
