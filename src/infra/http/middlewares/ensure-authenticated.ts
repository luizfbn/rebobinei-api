import { FastifyRequest, FastifyReply } from 'fastify';

export async function ensureAuthenticated(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply
			.status(401)
			.send({ message: 'Invalid or missing authentication token.' });
	}
}
