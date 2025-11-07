import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
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

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
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
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
