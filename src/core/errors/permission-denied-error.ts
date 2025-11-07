import { t } from '../i18n';

export class PermissionDeniedError extends Error {
	constructor(message: string = t('permissionDenied')) {
		super(message);
	}
}
