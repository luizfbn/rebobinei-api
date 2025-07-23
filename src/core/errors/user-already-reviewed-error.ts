export class UserAlreadyReviewedError extends Error {
	constructor(message: string = 'User already reviewed this movie.') {
		super(message);
	}
}
