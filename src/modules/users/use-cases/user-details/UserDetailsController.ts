import { FastifyReply, FastifyRequest } from 'fastify';
import { UserDetailsUseCase } from './UserDetailsUseCase';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class UserDetailsController {
	constructor(private userDetailsUseCase: UserDetailsUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };

			const result = await this.userDetailsUseCase.execute({ id });

			return reply.code(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
