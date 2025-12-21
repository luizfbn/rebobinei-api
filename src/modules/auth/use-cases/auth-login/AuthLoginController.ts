import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLoginUseCase } from './AuthLoginUseCase';
import { AuthLoginRoute } from './auth-login.schema';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';
import { t } from '../../../../core/i18n';

export class AuthLoginController {
	constructor(private authLoginUseCase: AuthLoginUseCase) {}

	async handle(request: FastifyRequest<AuthLoginRoute>, reply: FastifyReply) {
		try {
			const { email, password } = request.body;

			const user = await this.authLoginUseCase.execute({
				email,
				password,
			});

			const token = await reply.jwtSign(
				{},
				{
					sign: {
						sub: user.id,
						expiresIn: '7d',
					},
				}
			);

			return reply
				.setCookie('access_token', token, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'lax',
					maxAge: 60 * 60 * 24 * 7, // 7 days
				})
				.code(200)
				.send({ message: t('loginSuccess') });
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				return reply.code(401).send({ message: error.message });
			}

			console.error(error);
			return reply.code(500).send({ message: t('internalError') });
		}
	}
}
