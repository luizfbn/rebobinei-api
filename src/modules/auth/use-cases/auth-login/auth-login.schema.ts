import { z } from 'zod';
import { passwordSchema } from '../../../users/schemas/password.schema';
import { emailSchema } from '../../../users/schemas/email.schema';

const bodySchema = z.object({
	email: emailSchema,
	password: passwordSchema(),
});

export const authLoginRouteSchema = {
	body: bodySchema,
};

export interface AuthLoginRoute {
	Body: z.infer<typeof bodySchema>;
}

export type AuthLoginInputDTO = z.infer<typeof bodySchema>;
