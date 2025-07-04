export interface ListMoviesInputDTO {
	category: 'popular' | 'trending' | 'upcoming';
	language?: string;
	page: number;
}
