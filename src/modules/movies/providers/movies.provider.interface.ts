import { Movie } from '../entities/movie.entity';

export interface ListParams {
	page: number;
	language?: string;
}

export interface DetailsParams {
	id: number;
	language: string;
}

export interface SearchParams extends ListParams {
	query: string;
}

export interface PaginatedMovies {
	page: number;
	totalPages: number;
	totalResults: number;
	movies: Movie[];
}

export interface IMoviesProvider {
	getPopular(params: ListParams): Promise<PaginatedMovies>;
	getTrending(params: ListParams): Promise<PaginatedMovies>;
	getUpcoming(params: ListParams): Promise<PaginatedMovies>;
	getDetailsById(params: DetailsParams): Promise<Movie | null>;
	searchByTitle(params: SearchParams): Promise<PaginatedMovies>;
}
