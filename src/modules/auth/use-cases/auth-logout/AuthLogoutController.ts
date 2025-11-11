import { FastifyReply, FastifyRequest } from 'fastify';
import { t } from '../../../../core/i18n';

export class AuthLogoutController {
	async handle(_: FastifyRequest, reply: FastifyReply) {
		try {
			return reply
				.clearCookie('access_token')
				.code(200)
				.send({ message: t('logoutSuccess') });
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
