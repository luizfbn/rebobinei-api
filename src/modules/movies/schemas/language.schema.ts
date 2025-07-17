import { z } from 'zod';

const languageFormatRegex = /^[a-z]{2}-[a-z]{2}$/i;

export const languageSchema = z
	.string()
	.regex(languageFormatRegex, {
		error: "Language must be in 'll-RR' format (e.g., 'en-US', 'pt-BR').",
	})
	.transform(
		(lang) =>
			`${lang.split('-')[0].toLowerCase()}-${lang.split('-')[1].toUpperCase()}`
	)
	.optional()
	.default('en-US');
