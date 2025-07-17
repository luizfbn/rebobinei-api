import { z } from 'zod';
import { nameSchema } from '../../schemas/name.schema';
import { usernameSchema } from '../../schemas/username.schema';

const bodySchema = z.object({
	name: nameSchema.optional(),
	username: usernameSchema.optional(),
});

export const userProfileUpdateRouteSchema = {
	body: bodySchema,
};

export interface UserProfileUpdateRoute {
	Body: z.infer<typeof bodySchema>;
}

export type UserProfileUpdateInputDTO = z.infer<typeof bodySchema> & {
	userId: string;
};
