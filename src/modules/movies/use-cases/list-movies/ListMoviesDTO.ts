export interface ListMoviesDTO {
	category: 'popular' | 'trending' | 'upcoming';
	language: string;
	page: number;
}
