import '@fastify/jwt';
import { Role } from '../core/types/roles.type';

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		payload: {};
		user: {
			role: Role;
			sub: string;
			iat: number;
			exp: number;
		};
	}
}
