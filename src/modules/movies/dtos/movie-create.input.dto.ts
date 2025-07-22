import { Movie } from '../entities/movie.entity';

export type MovieCreateInputDTO = Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;
