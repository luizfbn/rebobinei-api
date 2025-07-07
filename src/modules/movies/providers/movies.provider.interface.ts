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

export interface IMoviesProvider {
	getPopular(params: ListParams): Promise<Movie[]>;
	getTrending(params: ListParams): Promise<Movie[]>;
	getUpcoming(params: ListParams): Promise<Movie[]>;
	getDetailsById(params: DetailsParams): Promise<Movie | null>;
	searchByTitle(params: SearchParams): Promise<Movie[]>;
}
