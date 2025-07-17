import { z } from 'zod';

export const emailSchema = z.email({ error: 'Invalid email format.' });
