import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from './middlewares/ensure-authenticated';
import { movieListController } from '../../modules/movies/use-cases/movie-list/movie-list.factory';
import { movieDetailsController } from '../../modules/movies/use-cases/movie-details/movie-details.factory';
import { movieSearchController } from '../../modules/movies/use-cases/movie-search/movie-search.factory';
import { reviewStatsByMovieController } from '../../modules/reviews/use-cases/review-stats-movie/review-stats-movie.factory';
import { reviewCreationController } from '../../modules/reviews/use-cases/review-creation/review-creation.factory';
import { reviewDeletionController } from '../../modules/reviews/use-cases/review-deletion/review-deletion.factory';
import { reviewDetailsController } from '../../modules/reviews/use-cases/review-details/review-details.factory';
import { reviewListController } from '../../modules/reviews/use-cases/review-list/review-list.factory';
import { reviewListByMovieController } from '../../modules/reviews/use-cases/review-list-movie/review-list-movie.factory';
import { reviewListByUserController } from '../../modules/reviews/use-cases/review-list-user/review-list-user.factory';
import { userAuthenticationController } from '../../modules/users/use-cases/user-authentication/user-authentication.factory';
import { userCreationController } from '../../modules/users/use-cases/user-creation/user-creation.factory';
import { userDeletionController } from '../../modules/users/use-cases/user-deletion/user-deletion.factory';
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
	ReviewStatsByMovieRoute,
	reviewStatsByMovieRouteSchema,
} from '../../modules/reviews/use-cases/review-stats-movie/review-stats-movie.schema';
import {
	ReviewCreationRoute,
	reviewCreationRouteSchema,
} from '../../modules/reviews/use-cases/review-creation/review-creation.schema';
import {
	ReviewDeletionRoute,
	reviewDeletionRouteSchema,
} from '../../modules/reviews/use-cases/review-deletion/review-deletion.schema';
import {
	ReviewDetailsRoute,
	reviewDetailsRouteSchema,
} from '../../modules/reviews/use-cases/review-details/review-details.schema';
import {
	ReviewListRoute,
	reviewListUserSchema,
} from '../../modules/reviews/use-cases/review-list/review-list.schema';
import {
	ReviewListByMovieRoute,
	reviewListByMovieSchema,
} from '../../modules/reviews/use-cases/review-list-movie/review-list-movie.schema';
import {
	ReviewListByAuthenticatedUserRoute,
	reviewListByAuthenticatedUserSchema,
	ReviewListByUserRoute,
	reviewListByUserSchema,
} from '../../modules/reviews/use-cases/review-list-user/review-list-user.schema';
import {
	UserAuthenticationRoute,
	userAuthenticationRouteSchema,
} from '../../modules/users/use-cases/user-authentication/user-authentication.schema';
import {
	UserCreationRoute,
	userCreationRouteSchema,
} from '../../modules/users/use-cases/user-creation/user-creation.schema';
import {
	UserDeletionRoute,
	userDeletionRouteSchema,
} from '../../modules/users/use-cases/user-deletion/user-deletion.schema';
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
	app.get('/', (_, reply) => reply.redirect('/movies'));
	app.get<MovieListRoute>(
		'/movies',
		{
			schema: movieListRouteSchema,
		},
		(request, reply) => movieListController.handle(request, reply)
	);
	app.get<MovieSearchRoute>(
		'/movies/search',
		{
			schema: movieSearchRouteSchema,
		},
		(request, reply) => movieSearchController.handle(request, reply)
	);
	app.get<MovieDetailsRoute>(
		'/movies/:id',
		{
			schema: movieDetailsRouteSchema,
		},
		(request, reply) => movieDetailsController.handle(request, reply)
	);
	app.get<ReviewListByMovieRoute>(
		'/movies/:id/reviews',
		{
			schema: reviewListByMovieSchema,
		},
		(request, reply) => reviewListByMovieController.handle(request, reply)
	);
	app.post<ReviewCreationRoute>(
		'/movies/:id/reviews',
		{
			onRequest: [ensureAuthenticated],
			schema: reviewCreationRouteSchema,
		},
		(request, reply) => reviewCreationController.handle(request, reply)
	);
	app.get<ReviewStatsByMovieRoute>(
		'/movies/:id/stats',
		{
			schema: reviewStatsByMovieRouteSchema,
		},
		(request, reply) => reviewStatsByMovieController.handle(request, reply)
	);
	app.post<UserCreationRoute>(
		'/users',
		{
			schema: userCreationRouteSchema,
		},
		(request, reply) => userCreationController.handle(request, reply)
	);
	app.delete<UserDeletionRoute>(
		'/users/me',
		{
			onRequest: [ensureAuthenticated],
			schema: userDeletionRouteSchema,
		},
		(request, reply) => userDeletionController.handle(request, reply)
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
	app.get<ReviewListByAuthenticatedUserRoute>(
		'/users/me/reviews',
		{
			onRequest: [ensureAuthenticated],
			schema: reviewListByAuthenticatedUserSchema,
		},
		(request, reply) => {
			const data = {
				id: request.user.sub,
				page: request.query.page,
				limit: request.query.limit,
				sort: request.query.sort,
				rating: request.query.rating,
			};
			return reviewListByUserController.handle(data, reply);
		}
	);
	app.get<UserDetailsRoute>(
		'/users/:id',
		{
			schema: userDetailsRouteSchema,
		},
		(request, reply) => userDetailsController.handle(request, reply)
	);
	app.get<ReviewListByUserRoute>(
		'/users/:id/reviews',
		{ schema: reviewListByUserSchema },
		(request, reply) => {
			const data = {
				id: request.params.id,
				page: request.query.page,
				limit: request.query.limit,
				sort: request.query.sort,
				rating: request.query.rating,
			};
			return reviewListByUserController.handle(data, reply);
		}
	);
	app.get<ReviewListRoute>(
		'/reviews',
		{ schema: reviewListUserSchema },
		(request, reply) => reviewListController.handle(request, reply)
	);
	app.get<ReviewDetailsRoute>(
		'/reviews/:id',
		{ schema: reviewDetailsRouteSchema },
		(request, reply) => reviewDetailsController.handle(request, reply)
	);
	app.delete<ReviewDeletionRoute>(
		'/reviews/:id',
		{ onRequest: [ensureAuthenticated], schema: reviewDeletionRouteSchema },
		(request, reply) => reviewDeletionController.handle(request, reply)
	);
	app.post<UserAuthenticationRoute>(
		'/login',
		{
			schema: userAuthenticationRouteSchema,
		},
		(request, reply) => userAuthenticationController.handle(request, reply)
	);
}
