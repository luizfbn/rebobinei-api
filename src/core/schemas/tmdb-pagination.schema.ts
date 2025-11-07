import { z } from 'zod';
import { t } from '../i18n';

export const tmdbPaginationSchema = z.object({
	page: z.coerce
		.number({ error: t('pageRequiredNumber') })
		.int({ error: t('pageMustBeInteger') })
		.min(1, { error: t('pageMin') })
		.default(1),
});
