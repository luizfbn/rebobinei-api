import { z, locales } from 'zod';
import { env } from '../config/env';

type LocaleStrings = keyof typeof locales;
const currLocale: LocaleStrings = env.LOCALE.startsWith('pt') ? 'pt' : 'en';

export function setupZodI18n() {
	z.config(locales[currLocale]());

	console.log(`[i18n] Zod i18n initialized (${currLocale})`);
}
