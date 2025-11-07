import { z } from 'zod';
import { t } from '../i18n';

export const paginationSchema = z.object({
	page: z.coerce
		.number({ error: t('pageRequiredNumber') })
		.int({ error: t('pageMustBeInteger') })
		.min(1, { error: t('pageMin') })
		.default(1),
	limit: z.coerce
		.number({ error: t('pageLimitRequiredNumber') })
		.int({ error: t('pageLimitMustBeInteger') })
		.min(1, { error: t('pageLimitMin') })
		.max(100, { error: t('pageLimitMax') })
		.default(20),
});
