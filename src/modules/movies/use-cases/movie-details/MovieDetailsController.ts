import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieDetailsUseCase } from './MovieDetailsUseCase';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { validateAndFormatLanguage } from '../../../../infra/http/validators/language-validator';

export class MovieDetailsController {
	constructor(private movieDetailsUseCase: MovieDetailsUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = request.params as { id: string };
			const { language } = request.query as { language?: string };

			const validatedLanguage = validateAndFormatLanguage(language);

			const detailsMovieDTO = {
				id: parseInt(id, 10),
				language: validatedLanguage,
			};

			const result = await this.movieDetailsUseCase.execute(detailsMovieDTO);

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
