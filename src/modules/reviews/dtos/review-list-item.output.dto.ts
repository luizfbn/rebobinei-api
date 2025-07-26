import { Rating } from '../types/rating.type';

export interface ReviewListItemOutputDTO {
	id: string;
	rating: Rating;
	comment: string | null;
	createdAt: Date;
	author: {
		id: string;
		name: string;
		username: string;
	};
}
