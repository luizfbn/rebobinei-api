import { z } from 'zod';
import { t } from '../../../core/i18n';

const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const usernameSchema = z
	.string()
	.min(3, { error: t('usernameMinLength') })
	.max(30, { error: t('usernameMaxLength') })
	.regex(usernameRegex, {
		error: t('usernameRegex'),
	});
