import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieSearchUseCase } from './MovieSearchUseCase';
import { validateAndFormatLanguage } from '../../../../infra/http/validators/language-validator';

export class MovieSearchController {
	constructor(private movieSearchUseCase: MovieSearchUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { query, language, page } = request.query as {
				query: string;
				language?: string;
				page?: string;
			};

			const validatedLanguage = validateAndFormatLanguage(language);

			const movieSearchDTO = {
				query,
				language: validatedLanguage,
				page: parseInt(page ?? '1', 10) || 1,
			};

			if (!movieSearchDTO.query) {
				return reply.code(400).send({ error: 'Invalid query parameter.' });
			}

			const result = await this.movieSearchUseCase.execute(movieSearchDTO);

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
