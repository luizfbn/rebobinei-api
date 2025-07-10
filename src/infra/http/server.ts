import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { routes } from './routes';

const app = fastify();

app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
});

app.register(routes);

const start = async () => {
	try {
		const address = await app.listen({
			host: '0.0.0.0',
			port: process.env.PORT ? Number(process.env.PORT) : 3333,
		});
		console.log(`Server listening on ${address}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
