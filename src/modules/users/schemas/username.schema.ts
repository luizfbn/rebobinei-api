import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const usernameSchema = z
	.string()
	.min(3, { error: 'Username must be at least 3 characters long.' })
	.max(15, { error: 'Username cannot be longer than 15 characters.' })
	.regex(usernameRegex, {
		error:
			'Username can only contain letters, numbers, and underscores (no spaces).',
	});
