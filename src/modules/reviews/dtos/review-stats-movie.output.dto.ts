import { Rating } from '../schemas/rating.schema';

export interface ReviewStatsByMovieOutputDTO {
	average: number;
	totalCount: number;
	counts: {
		[key in Rating]: number;
	};
}
