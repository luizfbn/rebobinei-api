import { Review } from '../entities/review.entity';

export interface ReviewDetailsOutputDTO
	extends Omit<Review, 'userId' | 'movieId'> {
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
