import { FastifyRequest, FastifyReply } from 'fastify';
import { t } from '../../../core/i18n';

export async function ensureAuthenticated(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.code(401).send({ error: t('invalidAuthToken') });
	}
}
