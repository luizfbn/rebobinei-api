import { MovieCreateInputDTO } from '../dtos/movie-create.input.dto';
import { MovieUpdateInputDTO } from '../dtos/movie-update.input.dto';
import { Movie } from '../entities/movie.entity';

export interface MoviesRepository {
	create(movie: MovieCreateInputDTO): Promise<Movie>;
	update(id: string, data: MovieUpdateInputDTO): Promise<Movie>;
	findByTmdbId(id: number): Promise<Movie | null>;
}
