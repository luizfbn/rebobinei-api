import { z } from 'zod';
import { t } from '../../../core/i18n';

export const passwordSchema = (
	minError: string = t('passwordMinLength'),
	maxError: string = t('passwordMaxLength')
) => z.string().min(6, { error: minError }).max(64, { error: maxError });
