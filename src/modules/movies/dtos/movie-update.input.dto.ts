import { Movie } from '../entities/movie.entity';

export type MovieUpdateInputDTO = Partial<
	Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>
>;
