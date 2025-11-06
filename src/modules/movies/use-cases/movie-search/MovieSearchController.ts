import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieSearchUseCase } from './MovieSearchUseCase';
import { MovieSearchRoute } from './movie-search.schema';

export class MovieSearchController {
	constructor(private movieSearchUseCase: MovieSearchUseCase) {}

	async handle(request: FastifyRequest<MovieSearchRoute>, reply: FastifyReply) {
		try {
			const { query, page } = request.query;

			const result = await this.movieSearchUseCase.execute({
				query,
				page,
			});

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
