import { FastifyReply, FastifyRequest } from 'fastify';
import { ListMoviesUseCase } from './ListMoviesUseCase';
import { ListMoviesDTO } from './ListMoviesDTO';

export class ListMoviesController {
	constructor(private listMoviesUseCase: ListMoviesUseCase) {}

	async handle(request: FastifyRequest, response: FastifyReply) {
		try {
			const queryParams = request.query;

			const listMoviesDTO: ListMoviesDTO = {
				category: (queryParams as any).category || 'popular',
				language: (queryParams as any).language || 'en-US',
				page: parseInt((queryParams as any).page, 10) || 1,
			};

			if (
				!['popular', 'trending', 'upcoming'].includes(listMoviesDTO.category)
			) {
				return response
					.status(400)
					.send({ error: 'Invalid category parameter.' });
			}

			const result = await this.listMoviesUseCase.execute(listMoviesDTO);

			return response.status(200).send(result);
		} catch (err) {
			return response
				.status(500)
				.send({ error: 'An internal error occurred.' });
		}
	}
}
