import { z } from 'zod';

export const passwordSchema = (
	error: string = 'The password must be at least 6 characters long.'
) => z.string().min(6, { error });
