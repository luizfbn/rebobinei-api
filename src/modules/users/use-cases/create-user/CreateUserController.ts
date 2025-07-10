import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserInputDTO } from './create-user.dto';
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error';

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, username, email, password } =
				request.body as CreateUserInputDTO;
			await this.createUserUseCase.execute({ name, username, email, password });

			return reply.status(201).send();
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) {
				return reply.status(409).send({ error: error.message });
			}

			throw error;
		}
	}
}
