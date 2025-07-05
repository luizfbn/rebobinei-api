import { FastifyInstance, FastifyRequest } from 'fastify';
import { listMoviesController } from '../../modules/movies/use-cases/list-movies/list-movies.factory';
import { detailsMovieController } from '../../modules/movies/use-cases/details-movie/details-movie.factory';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get('/movies', (req, reply) => listMoviesController.handle(req, reply));
	app.get('/movies/:id', (req, reply) =>
		detailsMovieController.handle(req, reply)
	);
}
