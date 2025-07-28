import { Rating } from '../schemas/rating.schema';

export interface ReviewWithAuthorOutputDTO {
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
