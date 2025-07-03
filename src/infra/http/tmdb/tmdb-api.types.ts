export interface TmdbMovieResultDTO {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	release_date: string;
	poster_path: string;
	backdrop_path: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
	original_language: string;
	popularity: number;
	adult: boolean;
	video: boolean;
}

export interface TmdbListResponseDTO<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
