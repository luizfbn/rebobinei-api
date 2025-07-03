interface IMovie {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: string;
	posterUrl: string;
	backdropUrl: string;
	genres?: { id: number; name: string }[];
	budget?: number;
	revenue?: number;
	certification?: string;
}

export class Movie {
	public readonly tmdbId: number;
	public title: string;
	public originalTitle: string;
	public overview: string;
	public releaseDate: string;
	public posterUrl: string;
	public backdropUrl: string;
	public genres?: { id: number; name: string }[];
	public budget?: number;
	public revenue?: number;
	public certification?: string;

	private constructor(props: IMovie) {
		this.tmdbId = props.tmdbId;
		this.title = props.title;
		this.originalTitle = props.originalTitle;
		this.overview = props.overview;
		this.releaseDate = props.releaseDate;
		this.posterUrl = props.posterUrl;
		this.backdropUrl = props.backdropUrl;
		this.genres = props.genres;
		this.budget = props.budget;
		this.revenue = props.revenue;
		this.certification = props.certification;
	}

	public static create(props: IMovie) {
		return new Movie(props);
	}
}
