export interface PaginatedOutputDTO<T> {
	page: number;
	totalPages: number;
	totalResults: number;
	data: T[];
}
