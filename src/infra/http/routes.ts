import { FastifyInstance } from 'fastify';
import { movieRoutes } from './routes/movies.routes';
import { userRoutes } from './routes/users.routes';
import { reviewRoutes } from './routes/reviews.routes';
import { authRoutes } from './routes/auth.routes';

export async function routes(app: FastifyInstance) {
	app.get('/', (_, reply) => reply.send('API is running'));
	app.register(movieRoutes);
	app.register(userRoutes);
	app.register(reviewRoutes);
	app.register(authRoutes);
}
