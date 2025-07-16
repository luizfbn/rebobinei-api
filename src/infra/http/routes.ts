import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from './middlewares/ensure-authenticated';
import { movieListController } from '../../modules/movies/use-cases/movie-list/movie-list.factory';
import { movieDetailsController } from '../../modules/movies/use-cases/movie-details/movie-details.factory';
import { movieSearchController } from '../../modules/movies/use-cases/movie-search/movie-search.factory';
import { userAuthenticationController } from '../../modules/users/use-cases/user-authentication/user-authentication.factory';
import { userAuthenticationBodySchema } from '../../modules/users/use-cases/user-authentication/user-authentication.dto';
import { userCreationController } from '../../modules/users/use-cases/user-creation/user-creation.factory';
import { userCreationBodySchema } from '../../modules/users/use-cases/user-creation/user-creation.dto';
import { userDetailsController } from '../../modules/users/use-cases/user-details/user-details.factory';
import { userPasswordChangeBodySchema } from '../../modules/users/use-cases/user-password-change/user-password-change.dto';
import { userPasswordChangeController } from '../../modules/users/use-cases/user-password-change/user-password-change.factory';
import { userEmailChangeController } from '../../modules/users/use-cases/user-email-change/user-email-change.factory';
import { userEmailChangeBodySchema } from '../../modules/users/use-cases/user-email-change/user-email-change.dto';
import { userProfileUpdateController } from '../../modules/users/use-cases/user-profile-update/user-profile-update.factory';
import { userProfileUpdateBodySchema } from '../../modules/users/use-cases/user-profile-update/user-profile-update.dto';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get('/movies', (req, reply) => movieListController.handle(req, reply));
	app.get('/movies/:id', (req, reply) =>
		movieDetailsController.handle(req, reply)
	);
	app.get('/movies/search', (req, reply) =>
		movieSearchController.handle(req, reply)
	);
	app.get('/users/:id', (req, reply) =>
		userDetailsController.handle(req, reply)
	);
	app.post(
		'/users',
		{
			schema: {
				body: userCreationBodySchema,
			},
		},
		(request, reply) => userCreationController.handle(request, reply)
	);
	app.patch(
		'/users/me',
		{
			onRequest: [ensureAuthenticated],
			schema: {
				body: userProfileUpdateBodySchema,
			},
		},
		(request, reply) => userProfileUpdateController.handle(request, reply)
	);
	app.patch(
		'/users/me/email',
		{
			onRequest: [ensureAuthenticated],
			schema: {
				body: userEmailChangeBodySchema,
			},
		},
		(request, reply) => userEmailChangeController.handle(request, reply)
	);
	app.patch(
		'/users/me/password',
		{
			onRequest: [ensureAuthenticated],
			schema: {
				body: userPasswordChangeBodySchema,
			},
		},
		(request, reply) => userPasswordChangeController.handle(request, reply)
	);
	app.post(
		'/login',
		{
			schema: {
				body: userAuthenticationBodySchema,
			},
		},
		(req, reply) => userAuthenticationController.handle(req, reply)
	);
}
