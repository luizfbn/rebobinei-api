export interface TmdbMovieDTO {
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

export interface TmdbMovieDetailsDTO {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	release_date: string;
	poster_path: string;
	backdrop_path: string;
	vote_average: number;
	vote_count: number;
	original_language: string;
	popularity: number;
	adult: boolean;
	video: boolean;
	belongs_to_collection: string;
	budget: number;
	genres: { id: number; name: string }[];
	homepage: string;
	imdb_id: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
}

export interface TmdbListResponseDTO<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
