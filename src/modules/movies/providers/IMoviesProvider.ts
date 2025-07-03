import { Movie } from '../movie.entity';

export interface ListParams {
	language: string;
	page: number;
}

export interface IMoviesProvider {
	getPopular(params: ListParams): Promise<Movie[]>;
	getTrending(params: ListParams): Promise<Movie[]>;
	getUpcoming(params: ListParams): Promise<Movie[]>;
}
