import { z } from 'zod';
import { passwordSchema } from '../../schemas/password.schema';

const bodySchema = z.object({
	password: passwordSchema(),
});

export const userDeletionRouteSchema = {
	body: bodySchema,
};

export interface UserDeletionRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserDeletionInputDTO = z.infer<typeof bodySchema> & {
	userId: string;
};
