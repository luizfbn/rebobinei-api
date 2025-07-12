export interface MovieListInputDTO {
	category: 'popular' | 'trending' | 'upcoming';
	language: string;
	page: number;
}
