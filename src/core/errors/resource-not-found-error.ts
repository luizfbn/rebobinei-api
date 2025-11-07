import { t } from '../i18n';

export class ResourceNotFoundError extends Error {
	constructor(message: string = t('resourceNotFound')) {
		super(message);
	}
}
