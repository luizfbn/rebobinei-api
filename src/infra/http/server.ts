import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { routes } from './routes';
import { env } from '../../core/config/env';
import {
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { setupZodI18n } from '../../core/i18n/zod-i18n';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
	origin: true,
	credentials: true,
});

app.register(fastifyCookie, {
	secret: env.COOKIE_SECRET,
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'access_token',
		signed: false,
	},
});

app.register(routes);

const start = async () => {
	try {
		setupZodI18n();
		const address = await app.listen({
			host: '0.0.0.0',
			port: env.APP_PORT,
		});
		console.log(`Server listening on ${address}`);
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};
start();
