import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { reviewListByUserController } from '../../../modules/reviews/use-cases/review-list-user/review-list-user.factory';
import { userCreationController } from '../../../modules/users/use-cases/user-creation/user-creation.factory';
import { userDeletionController } from '../../../modules/users/use-cases/user-deletion/user-deletion.factory';
import { userProfileController } from '../../../modules/users/use-cases/user-profile/user-profile.factory';
import { userPasswordChangeController } from '../../../modules/users/use-cases/user-password-change/user-password-change.factory';
import { userEmailChangeController } from '../../../modules/users/use-cases/user-email-change/user-email-change.factory';
import { userProfileUpdateController } from '../../../modules/users/use-cases/user-profile-update/user-profile-update.factory';
import {
	ReviewListByAuthenticatedUserRoute,
	reviewListByAuthenticatedUserSchema,
	ReviewListByUserRoute,
	reviewListByUserSchema,
} from '../../../modules/reviews/use-cases/review-list-user/review-list-user.schema';
import {
	UserCreationRoute,
	userCreationRouteSchema,
} from '../../../modules/users/use-cases/user-creation/user-creation.schema';
import {
	UserDeletionRoute,
	userDeletionRouteSchema,
} from '../../../modules/users/use-cases/user-deletion/user-deletion.schema';
import {
	UserProfileRoute,
	userProfileRouteSchema,
} from '../../../modules/users/use-cases/user-profile/user-profile.schema';
import {
	UserPasswordChangeRoute,
	userPasswordChangeRouteSchema,
} from '../../../modules/users/use-cases/user-password-change/user-password-change.schema';
import {
	UserEmailChangeRoute,
	userEmailChangeRouteSchema,
} from '../../../modules/users/use-cases/user-email-change/user-email-change.schema';
import {
	UserProfileUpdateRoute,
	userProfileUpdateRouteSchema,
} from '../../../modules/users/use-cases/user-profile-update/user-profile-update.schema';

export async function userRoutes(app: FastifyInstance) {
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
	app.get<UserProfileRoute>(
		'/users/:id',
		{
			schema: userProfileRouteSchema,
		},
		(request, reply) => userProfileController.handle(request, reply)
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
}
