import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieSearchUseCase } from './MovieSearchUseCase';
import { MovieSearchRoute } from './movie-search.schema';
import { t } from '../../../../core/i18n';

export class MovieSearchController {
	constructor(private movieSearchUseCase: MovieSearchUseCase) {}

	async handle(request: FastifyRequest<MovieSearchRoute>, reply: FastifyReply) {
		try {
			const { q, page } = request.query;

			const result = await this.movieSearchUseCase.execute({
				q,
				page,
			});

			return reply.code(200).send(result);
		} catch (error) {
			console.error(error);
			return reply.code(500).send({ error: t('internalError') });
		}
	}
}
