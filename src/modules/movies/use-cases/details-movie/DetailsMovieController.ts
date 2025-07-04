import { FastifyReply, FastifyRequest } from 'fastify';
import { DetailsMovieUseCase } from './DetailsMovieUseCase';
import { DetailsMovieInputDTO } from './details-movie.dto';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';

export class DetailsMovieController {
	constructor(private detailsMovieUseCase: DetailsMovieUseCase) {}

	async handle(
		request: FastifyRequest<{ Params: { id: number } }>,
		reply: FastifyReply
	) {
		try {
			const queryParams = request.query;

			const detailsMovieDTO: DetailsMovieInputDTO = {
				id: request.params.id,
				language: (queryParams as any).language,
			};

			const result = await this.detailsMovieUseCase.execute(detailsMovieDTO);

			return reply.code(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ error: error.message });
			}

			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
