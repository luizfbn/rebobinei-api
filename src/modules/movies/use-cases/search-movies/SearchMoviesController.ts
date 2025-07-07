import { FastifyReply, FastifyRequest } from 'fastify';
import { SearchMoviesUseCase } from './SearchMoviesUseCase';
import { SearchMoviesInputDTO } from './search-movies.dto';

export class SearchMoviesController {
	constructor(private searchMoviesUseCase: SearchMoviesUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const queryParams = request.query;

			const searchMoviesDTO: SearchMoviesInputDTO = {
				query: (queryParams as any).query,
				language: (queryParams as any).language,
				page: parseInt((queryParams as any).page, 10) || 1,
			};

			if (!searchMoviesDTO.query) {
				return reply.code(400).send({ error: 'Invalid query parameter.' });
			}

			const result = await this.searchMoviesUseCase.execute(searchMoviesDTO);

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
