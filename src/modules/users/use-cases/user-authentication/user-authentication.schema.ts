import { z } from 'zod';
import { passwordSchema } from '../../schemas/password.schema';
import { emailSchema } from '../../schemas/email.schema';

const bodySchema = z.object({
	email: emailSchema,
	password: passwordSchema(),
});

export const userAuthenticationRouteSchema = {
	body: bodySchema,
};

export interface UserAuthenticationRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserAuthenticationInputDTO = z.infer<typeof bodySchema>;
