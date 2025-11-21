import { Rating } from '../schemas/rating.schema';

export interface ReviewDetailsOutputDTO {
	id: string;
	rating: Rating;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
	author: {
		id: string;
		name: string;
		username: string;
	};
	movie: {
		tmdbId: number;
		title: string;
		originalTitle: string;
		overview: string;
		posterUrl: string | null;
		backdropUrl: string | null;
	};
}
