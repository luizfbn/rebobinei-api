import { FastifyReply, FastifyRequest } from 'fastify';
import { ListMoviesUseCase } from './ListMoviesUseCase';
import { ListMoviesInputDTO } from './list-movies.dto';

export class ListMoviesController {
	constructor(private listMoviesUseCase: ListMoviesUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const queryParams = request.query;

			const listMoviesDTO: ListMoviesInputDTO = {
				category: (queryParams as any).category || 'popular',
				language: (queryParams as any).language,
				page: parseInt((queryParams as any).page, 10) || 1,
			};

			if (
				!['popular', 'trending', 'upcoming'].includes(listMoviesDTO.category)
			) {
				return reply.code(400).send({ error: 'Invalid category parameter.' });
			}

			const result = await this.listMoviesUseCase.execute(listMoviesDTO);

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
