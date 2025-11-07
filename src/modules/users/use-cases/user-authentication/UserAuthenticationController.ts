import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAuthenticationUseCase } from './UserAuthenticationUseCase';
import { UserAuthenticationRoute } from './user-authentication.schema';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { t } from '../../../../core/i18n';

export class UserAuthenticationController {
	constructor(private userAuthenticationUseCase: UserAuthenticationUseCase) {}

	async handle(
		request: FastifyRequest<UserAuthenticationRoute>,
		reply: FastifyReply
	) {
		try {
			const { email, password } = request.body;

			const user = await this.userAuthenticationUseCase.execute({
				email,
				password,
			});

			const token = await reply.jwtSign(
				{
					role: user.role,
					name: user.name,
					username: user.username,
				},
				{
					sign: {
						sub: user.id,
						expiresIn: '7d',
					},
				}
			);

			return reply.code(200).send({ token });
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				return reply.code(401).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
