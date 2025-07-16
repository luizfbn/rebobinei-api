import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieListUseCase } from './MovieListUseCase';
import { validateAndFormatLanguage } from '../../../../infra/http/validators/language-validator';

export class MovieListController {
	constructor(private movieListUseCase: MovieListUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { category, language, page } = request.query as {
				category: 'popular' | 'trending' | 'upcoming';
				language?: string;
				page?: string;
			};

			const validatedLanguage = validateAndFormatLanguage(language);

			const movieListDTO = {
				category: category || 'popular',
				language: validatedLanguage,
				page: parseInt(page ?? '1', 10) || 1,
			};

			if (
				!['popular', 'trending', 'upcoming'].includes(movieListDTO.category)
			) {
				return reply.code(400).send({ error: 'Invalid category parameter.' });
			}

			const result = await this.movieListUseCase.execute(movieListDTO);

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: 'An internal error occurred.' });
		}
	}
}
