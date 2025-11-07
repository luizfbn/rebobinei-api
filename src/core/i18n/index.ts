import { env } from '../config/env';
import { messages } from './messages';

export function t(key: keyof (typeof messages)['en-US']) {
	const lang = env.LOCALE in messages ? env.LOCALE : 'en-US';
	return messages[lang][key] || key;
}
