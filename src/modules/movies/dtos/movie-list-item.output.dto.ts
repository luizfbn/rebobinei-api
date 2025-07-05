export interface MovieListItemOutputDTO {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: string;
	posterUrl: string | null;
	backdropUrl: string | null;
}
