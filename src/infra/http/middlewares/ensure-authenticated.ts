import { FastifyRequest, FastifyReply } from 'fastify';

export async function ensureAuthenticated(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.code(401).send({ error: 'Invalid or missing authentication token.' });
	}
}
