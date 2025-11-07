import { t } from '../i18n';

export class UserAlreadyReviewedError extends Error {
	constructor(message: string = t('userAlreadyReviewed')) {
		super(message);
	}
}
