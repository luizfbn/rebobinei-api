import { CastMember } from './cast-member.type';
import { CrewMember } from './crew-member.type';

interface IMovie {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: string;
	posterUrl: string | null;
	backdropUrl: string | null;
	genres?: { id: number; name: string }[];
	runtime?: number;
	budget?: number;
	revenue?: number;
	certification?: string;
	directors?: CrewMember[];
	cast?: CastMember[];
}

export class Movie {
	public readonly tmdbId: number;
	public title: string;
	public originalTitle: string;
	public overview: string;
	public releaseDate: string;
	public posterUrl: string | null;
	public backdropUrl: string | null;
	public genres?: { id: number; name: string }[];
	public runtime?: number;
	public budget?: number;
	public revenue?: number;
	public certification?: string;
	public directors?: CrewMember[];
	public cast?: CastMember[];

	private constructor(props: IMovie) {
		this.tmdbId = props.tmdbId;
		this.title = props.title;
		this.originalTitle = props.originalTitle;
		this.overview = props.overview;
		this.releaseDate = props.releaseDate;
		this.posterUrl = props.posterUrl;
		this.backdropUrl = props.backdropUrl;
		this.genres = props.genres;
		this.runtime = props.runtime;
		this.budget = props.budget;
		this.revenue = props.revenue;
		this.certification = props.certification;
		this.directors = props.directors;
		this.cast = props.cast;
	}

	public static create(props: IMovie) {
		return new Movie(props);
	}
}
