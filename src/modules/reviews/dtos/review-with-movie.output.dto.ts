import { Rating } from '../schemas/rating.schema';

export interface ReviewWithMovieOutputDTO {
	id: string;
	rating: Rating;
	comment: string | null;
	createdAt: Date;
	movie: {
		tmdbId: number;
		title: string;
		originalTitle: string;
		overview: string;
		posterUrl: string | null;
		backdropUrl: string | null;
	};
}
