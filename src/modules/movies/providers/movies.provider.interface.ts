import { Movie } from '../movie.entity';

interface BaseParams {
	language?: string;
}

export interface ListParams extends BaseParams {
	page: number;
}

export interface DetailsParams extends BaseParams {
	id: number;
}

export interface IMoviesProvider {
	getPopular(params: ListParams): Promise<Movie[]>;
	getTrending(params: ListParams): Promise<Movie[]>;
	getUpcoming(params: ListParams): Promise<Movie[]>;
	getDetailsById(params: DetailsParams): Promise<Movie | null>;
}
