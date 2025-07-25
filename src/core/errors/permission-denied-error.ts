export class PermissionDeniedError extends Error {
	constructor(message: string = 'Permission denied.') {
		super(message);
	}
}
