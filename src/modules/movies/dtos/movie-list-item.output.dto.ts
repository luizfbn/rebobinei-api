export interface MovieListItemOutputDTO {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: Date | null;
	posterUrl: string | null;
	backdropUrl: string | null;
}
