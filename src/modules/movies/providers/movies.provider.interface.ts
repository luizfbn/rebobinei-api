import { Movie } from '../movie.entity';

export interface ListParams {
	page: number;
	language?: string;
}

export interface DetailsParams {
	id: number;
	language: string;
}

export interface IMoviesProvider {
	getPopular(params: ListParams): Promise<Movie[]>;
	getTrending(params: ListParams): Promise<Movie[]>;
	getUpcoming(params: ListParams): Promise<Movie[]>;
	getDetailsById(params: DetailsParams): Promise<Movie | null>;
}
