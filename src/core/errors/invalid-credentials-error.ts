import { t } from '../i18n';

export class InvalidCredentialsError extends Error {
	constructor(message: string = t('invalidCredentials')) {
		super(message);
	}
}
