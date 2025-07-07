import { FastifyInstance } from 'fastify';
import { listMoviesController } from '../../modules/movies/use-cases/list-movies/list-movies.factory';
import { detailsMovieController } from '../../modules/movies/use-cases/details-movie/details-movie.factory';
import { searchMoviesController } from '../../modules/movies/use-cases/search-movies/search-movies.factory';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get('/movies', (req, reply) => listMoviesController.handle(req, reply));
	app.get('/movies/:id', (req, reply) =>
		detailsMovieController.handle(req, reply)
	);
	app.get('/movies/search', (req, reply) =>
		searchMoviesController.handle(req, reply)
	);
}
