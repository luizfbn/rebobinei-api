import { FastifyInstance } from 'fastify';
import { listMoviesController } from '../../modules/movies/use-cases/list-movies/list-movies.factory';
import { detailsMovieController } from '../../modules/movies/use-cases/details-movie/details-movie.factory';
import { searchMoviesController } from '../../modules/movies/use-cases/search-movies/search-movies.factory';
import { authenticateUserController } from '../../modules/users/use-cases/authenticate-user/authenticate-user.factory';
import { authenticateBodySchema } from '../../modules/users/use-cases/authenticate-user/authenticate-user.dto';
import { createUserController } from '../../modules/users/use-cases/create-user/create-user.factory';
import { createUserBodySchema } from '../../modules/users/use-cases/create-user/create-user.dto';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get('/movies', (req, reply) => listMoviesController.handle(req, reply));
	app.get('/movies/:id', (req, reply) =>
		detailsMovieController.handle(req, reply)
	);
	app.get('/movies/search', (req, reply) =>
		searchMoviesController.handle(req, reply)
	);
	app.post(
		'/users',
		{
			schema: {
				body: createUserBodySchema,
			},
		},
		(request, reply) => createUserController.handle(request, reply)
	);
	app.post(
		'/login',
		{
			schema: {
				body: authenticateBodySchema,
			},
		},
		(req, reply) => authenticateUserController.handle(req, reply)
	);
}
