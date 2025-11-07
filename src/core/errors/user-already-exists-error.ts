import { t } from '../i18n';

export class UserAlreadyExistsError extends Error {
	constructor(message: string = t('userAlreadyExists')) {
		super(message);
	}
}
