export type Rating = 1 | 2 | 3 | 4 | 5;

export function isRating(value: number): value is Rating {
	if (!Number.isInteger(value)) {
		return false;
	}
	return value >= 1 && value <= 5;
}
