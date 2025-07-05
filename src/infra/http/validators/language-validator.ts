const languageFormatRegex = /^[a-z]{2}-[a-z]{2}$/i; // ex: pt-BR, en-us
const defaultLanguage = 'en-US';

export function validateAndFormatLanguage(language: unknown) {
	if (typeof language !== 'string' || !languageFormatRegex.test(language)) {
		return defaultLanguage;
	}

	const parts = language.split('-');
	const languageCode = parts[0].toLowerCase();
	const regionCode = parts[1].toUpperCase();

	return `${languageCode}-${regionCode}`;
}
