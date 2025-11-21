import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { authLoginController } from '../../../modules/auth/use-cases/auth-login/auth-login.factory';
import { authLogoutController } from '../../../modules/auth/use-cases/auth-logout/auth-logout.factory';
import { authCurrentUserController } from '../../../modules/auth/use-cases/auth-current-user/auth-current-user.factory';
import {
	AuthLoginRoute,
	authLoginRouteSchema,
} from '../../../modules/auth/use-cases/auth-login/auth-login.schema';

export async function authRoutes(app: FastifyInstance) {
	app.post<AuthLoginRoute>(
		'/auth/login',
		{
			schema: authLoginRouteSchema,
		},
		(request, reply) => authLoginController.handle(request, reply)
	);
	app.post(
		'/auth/logout',
		{
			onRequest: [ensureAuthenticated],
		},
		(request, reply) => authLogoutController.handle(request, reply)
	);
	app.get(
		'/auth/me',
		{
			onRequest: [ensureAuthenticated],
		},
		(request, reply) => authCurrentUserController.handle(request, reply)
	);
}
