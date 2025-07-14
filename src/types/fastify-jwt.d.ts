import '@fastify/jwt';
import { Role } from '../core/types/roles.type';

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		payload: {
			role: Role;
			name: string;
			username: string;
		};
		user: {
			role: Role;
			sub: string;
			name: string;
			username: string;
			iat: number;
			exp: number;
		};
	}
}
