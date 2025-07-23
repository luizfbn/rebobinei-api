import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from './middlewares/ensure-authenticated';
import { movieListController } from '../../modules/movies/use-cases/movie-list/movie-list.factory';
import { movieDetailsController } from '../../modules/movies/use-cases/movie-details/movie-details.factory';
import { movieSearchController } from '../../modules/movies/use-cases/movie-search/movie-search.factory';
import { reviewCreationController } from '../../modules/reviews/use-cases/review-creation/review-creation.factory';
import { userAuthenticationController } from '../../modules/users/use-cases/user-authentication/user-authentication.factory';
import { userCreationController } from '../../modules/users/use-cases/user-creation/user-creation.factory';
import { userDetailsController } from '../../modules/users/use-cases/user-details/user-details.factory';
import { userPasswordChangeController } from '../../modules/users/use-cases/user-password-change/user-password-change.factory';
import { userEmailChangeController } from '../../modules/users/use-cases/user-email-change/user-email-change.factory';
import { userProfileUpdateController } from '../../modules/users/use-cases/user-profile-update/user-profile-update.factory';
import {
	MovieListRoute,
	movieListRouteSchema,
} from '../../modules/movies/use-cases/movie-list/movie-list.schema';
import {
	MovieDetailsRoute,
	movieDetailsRouteSchema,
} from '../../modules/movies/use-cases/movie-details/movie-details.schema';
import {
	MovieSearchRoute,
	movieSearchRouteSchema,
} from '../../modules/movies/use-cases/movie-search/movie-search.schema';
import {
	ReviewCreationRoute,
	reviewCreationRouteSchema,
} from '../../modules/reviews/use-cases/review-creation/review-creation.schema';
import {
	UserAuthenticationRoute,
	userAuthenticationRouteSchema,
} from '../../modules/users/use-cases/user-authentication/user-authentication.schema';
import {
	UserCreationRoute,
	userCreationRouteSchema,
} from '../../modules/users/use-cases/user-creation/user-creation.schema';
import {
	UserDetailsRoute,
	userDetailsRouteSchema,
} from '../../modules/users/use-cases/user-details/user-details.schema';
import {
	UserPasswordChangeRoute,
	userPasswordChangeRouteSchema,
} from '../../modules/users/use-cases/user-password-change/user-password-change.schema';
import {
	UserEmailChangeRoute,
	userEmailChangeRouteSchema,
} from '../../modules/users/use-cases/user-email-change/user-email-change.schema';
import {
	UserProfileUpdateRoute,
	userProfileUpdateRouteSchema,
} from '../../modules/users/use-cases/user-profile-update/user-profile-update.schema';

export async function routes(app: FastifyInstance) {
	app.get('/', () => 'Hello world');
	app.get<MovieListRoute>(
		'/movies',
		{
			schema: movieListRouteSchema,
		},
		(request, reply) => movieListController.handle(request, reply)
	);
	app.get<MovieDetailsRoute>(
		'/movies/:id',
		{
			schema: movieDetailsRouteSchema,
		},
		(request, reply) => movieDetailsController.handle(request, reply)
	);
	app.get<MovieSearchRoute>(
		'/movies/search',
		{
			schema: movieSearchRouteSchema,
		},
		(request, reply) => movieSearchController.handle(request, reply)
	);
	app.post<ReviewCreationRoute>(
		'/movies/:tmdbMovieId/reviews',
		{
			onRequest: [ensureAuthenticated],
			schema: reviewCreationRouteSchema,
		},
		(request, reply) => reviewCreationController.handle(request, reply)
	);
	app.get<UserDetailsRoute>(
		'/users/:id',
		{
			schema: userDetailsRouteSchema,
		},
		(request, reply) => userDetailsController.handle(request, reply)
	);
	app.post<UserCreationRoute>(
		'/users',
		{
			schema: userCreationRouteSchema,
		},
		(request, reply) => userCreationController.handle(request, reply)
	);
	app.patch<UserProfileUpdateRoute>(
		'/users/me',
		{
			onRequest: [ensureAuthenticated],
			schema: userProfileUpdateRouteSchema,
		},
		(request, reply) => userProfileUpdateController.handle(request, reply)
	);
	app.patch<UserEmailChangeRoute>(
		'/users/me/email',
		{
			onRequest: [ensureAuthenticated],
			schema: userEmailChangeRouteSchema,
		},
		(request, reply) => userEmailChangeController.handle(request, reply)
	);
	app.patch<UserPasswordChangeRoute>(
		'/users/me/password',
		{
			onRequest: [ensureAuthenticated],
			schema: userPasswordChangeRouteSchema,
		},
		(request, reply) => userPasswordChangeController.handle(request, reply)
	);
	app.post<UserAuthenticationRoute>(
		'/login',
		{
			schema: userAuthenticationRouteSchema,
		},
		(request, reply) => userAuthenticationController.handle(request, reply)
	);
}
