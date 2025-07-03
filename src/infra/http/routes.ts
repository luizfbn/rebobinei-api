import { FastifyInstance } from 'fastify';
import { listMoviesController } from '../../modules/movies/use-cases/list-movies/list-movies.factory';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get('/movies', (req, res) => listMoviesController.handle(req, res));
}
