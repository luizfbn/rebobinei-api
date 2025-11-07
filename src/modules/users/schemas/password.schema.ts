import { z } from 'zod';
import { t } from '../../../core/i18n';

export const passwordSchema = (error: string = t('passwordMinLength')) =>
	z.string().min(6, { error });
