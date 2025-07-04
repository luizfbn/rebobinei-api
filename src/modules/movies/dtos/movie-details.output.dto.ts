export interface MovieDetailsOutputDTO {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: string;
	posterUrl: string;
	backdropUrl: string;
	genres: { id: number; name: string }[];
	budget: number;
	revenue: number;
	certification: string;
}
