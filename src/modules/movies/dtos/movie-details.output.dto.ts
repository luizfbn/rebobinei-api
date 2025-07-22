import { CastMember } from '../entities/cast-member.interface';

export interface MovieDetailsOutputDTO {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: Date | null;
	posterUrl: string | null;
	backdropUrl: string | null;
	genres: string[];
	runtime: number;
	budget: number;
	revenue: number;
	certification: string | null;
	directors: string[];
	cast: CastMember[];
}
