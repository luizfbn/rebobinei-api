import { z } from 'zod';
import { passwordSchema } from '../../schemas/password.schema';
import { emailSchema } from '../../schemas/email.schema';
import { nameSchema } from '../../schemas/name.schema';
import { usernameSchema } from '../../schemas/username.schema';

const bodySchema = z.object({
	name: nameSchema,
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema(),
});

export const userCreationRouteSchema = {
	body: bodySchema,
};

export interface UserCreationRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserCreationInputDTO = z.infer<typeof bodySchema>;
