import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AuthenticateInputDTO } from './authenticate-user.dto';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class AuthenticateUserController {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { email, password } = request.body as AuthenticateInputDTO;

			const user = await this.authenticateUserUseCase.execute({
				email,
				password,
			});

			const token = await reply.jwtSign(
				{
					role: user.role,
				},
				{
					sign: {
						sub: user.id,
						expiresIn: '7d',
					},
				}
			);

			return reply.status(200).send({ token });
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				return reply.status(401).send({ error: error.message });
			}
			throw error;
		}
	}
}
