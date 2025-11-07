import { z } from 'zod';
import { t } from '../../../core/i18n';

export const emailSchema = z.email({ error: t('invalidEmailFormat') });
