import { z } from 'zod';
import { t } from '../../../../core/i18n';

const paramsSchema = z.object({
	id: z.string().nonempty({ error: t('invalidUserId') }),
});

export type AuthCurrentUserInputDTO = z.infer<typeof paramsSchema>;
