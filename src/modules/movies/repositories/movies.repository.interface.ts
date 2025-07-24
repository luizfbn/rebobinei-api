import {
	MovieCreateInputDTO,
	MovieUpdateInputDTO,
} from './movies.repository.types';
import { Movie } from '../entities/movie.entity';

export interface MoviesRepository {
	create(movie: MovieCreateInputDTO): Promise<Movie>;
	update(id: string, data: MovieUpdateInputDTO): Promise<Movie>;
	findByTmdbId(id: number): Promise<Movie | null>;
}
