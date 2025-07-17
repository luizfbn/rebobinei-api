import { z } from 'zod';

export const nameSchema = z
	.string()
	.trim()
	.min(1, { error: 'Name cannot be empty.' })
	.max(50, { error: 'Name cannot be longer than 50 characters.' });
