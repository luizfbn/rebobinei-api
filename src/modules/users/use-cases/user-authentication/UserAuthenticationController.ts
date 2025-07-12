import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAuthenticationUseCase } from './UserAuthenticationUseCase';
import { UserAuthenticationInputDTO } from './user-authentication.dto';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class UserAuthenticationController {
	constructor(private userAuthenticationUseCase: UserAuthenticationUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { email, password } = request.body as UserAuthenticationInputDTO;

			const user = await this.userAuthenticationUseCase.execute({
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
