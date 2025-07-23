import { Rating } from '../types/rating.type';

interface IReview {
	id: string;
	userId: string;
	movieId: string;
	rating: Rating;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export class Review {
	public readonly id: string;
	public readonly userId: string;
	public readonly movieId: string;
	public rating: Rating;
	public comment: string | null;
	public createdAt: Date;
	public updatedAt: Date;

	private constructor(props: IReview) {
		this.id = props.id;
		this.userId = props.userId;
		this.movieId = props.movieId;
		this.rating = props.rating;
		this.comment = props.comment;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public static create(props: IReview) {
		return new Review(props);
	}
}
