import { FastifyReply, FastifyRequest } from 'fastify';
import { MovieDetailsUseCase } from './MovieDetailsUseCase';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { MovieDetailsRoute } from './movie-details.schema';
import { t } from '../../../../core/i18n';

export class MovieDetailsController {
	constructor(private movieDetailsUseCase: MovieDetailsUseCase) {}

	async handle(
		request: FastifyRequest<MovieDetailsRoute>,
		reply: FastifyReply
	) {
		try {
			const { id } = request.params;

			const result = await this.movieDetailsUseCase.execute({
				id,
			});

			return reply.code(200).send(result);
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				return reply.code(404).send({ message: error.message });
			}

			console.error(error);
			return reply.code(500).send({ message: t('internalError') });
		}
	}
}
