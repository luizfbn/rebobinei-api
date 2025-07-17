import { z } from 'zod';
import { passwordSchema } from '../../schemas/password.schema';
import { emailSchema } from '../../schemas/email.schema';

const bodySchema = z.object({
	password: passwordSchema(),
	newEmail: emailSchema,
});

export const userEmailChangeRouteSchema = {
	body: bodySchema,
};

export interface UserEmailChangeRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserEmailChangeInputDTO = z.infer<typeof bodySchema> & {
	userId: string;
};
