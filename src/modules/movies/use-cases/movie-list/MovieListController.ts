import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieListUseCase } from './MovieListUseCase';
import { MovieListRoute } from './movie-list.schema';

export class MovieListController {
	constructor(private movieListUseCase: MovieListUseCase) {}

	async handle(request: FastifyRequest<MovieListRoute>, reply: FastifyReply) {
		try {
			const { category, page } = request.query;

			const result = await this.movieListUseCase.execute({
				category,
				page,
			});

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
