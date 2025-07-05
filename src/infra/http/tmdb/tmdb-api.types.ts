interface TmdbMovieBase {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	release_date: string;
	poster_path: string | null;
	backdrop_path: string | null;
	vote_average: number;
	vote_count: number;
	original_language: string;
	popularity: number;
	adult: boolean;
	video: boolean;
}

export interface TmdbMovieDTO extends TmdbMovieBase {
	genre_ids: number[];
}

export interface TmdbMovieDetailsDTO extends TmdbMovieBase {
	belongs_to_collection: string;
	budget: number;
	genres: { id: number; name: string }[];
	homepage: string;
	imdb_id: string;
	production_companies: {
		id: number;
		logo_path: string | null;
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

export interface TmdbMovieReleaseDatesDTO {
	id: number;
	results: {
		iso_3166_1: string;
		release_dates: {
			certification: string;
			descriptors: string[];
			iso_639_1: string;
			note: string;
			release_date: string;
			type: number;
		}[];
	}[];
}

export interface TmdbMovieCreditsDTO {
	id: number;
	cast: TmdbCastMemberDTO[];
	crew: TmdbCrewMemberDTO[];
}

export interface TmdbListResponseDTO<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

interface TmdbCreditsMemberBase {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: string;
	profile_path: string | null;
	credit_id: string;
}

interface TmdbCastMemberDTO extends TmdbCreditsMemberBase {
	cast_id: number;
	character: string;
	order: number;
}

interface TmdbCrewMemberDTO extends TmdbCreditsMemberBase {
	department: string;
	job: string;
}
