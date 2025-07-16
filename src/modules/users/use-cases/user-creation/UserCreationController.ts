import { FastifyReply, FastifyRequest } from 'fastify';
import { UserCreationUseCase } from './UserCreationUseCase';
import { UserCreationInputDTO } from './user-creation.dto';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';

export class UserCreationController {
	constructor(private userCreationUseCase: UserCreationUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, username, email, password } =
				request.body as UserCreationInputDTO;
			await this.userCreationUseCase.execute({
				name,
				username,
				email,
				password,
			});

			return reply.status(201).send();
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				return reply.status(409).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
