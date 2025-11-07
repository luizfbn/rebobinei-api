import { z } from 'zod';
import { t } from '../../../core/i18n';

export const nameSchema = z
	.string()
	.trim()
	.min(1, { error: t('nameNotEmpty') })
	.max(50, { error: t('nameMaxLength') });
