import { randomUUID } from 'node:crypto';
import { CastMember } from './cast-member.interface';
import { CrewMember } from './crew-member.interface';
import { Genre } from './genre.interface';

interface IMovie {
	tmdbId: number;
	title: string;
	originalTitle: string;
	overview: string;
	releaseDate: Date | null;
	posterPath: string | null;
	backdropPath: string | null;
	genres: Genre[];
	runtime: number;
	budget: number;
	revenue: number;
	certification: string | null;
	directors: CrewMember[];
	cast: CastMember[];
	createdAt?: Date;
	updatedAt?: Date;
}

export class Movie {
	public readonly id: string;
	public readonly tmdbId: number;
	public title: string;
	public originalTitle: string;
	public overview: string;
	public releaseDate: Date | null;
	public posterPath: string | null;
	public backdropPath: string | null;
	public genres: Genre[];
	public runtime: number;
	public budget: number;
	public revenue: number;
	public certification: string | null;
	public directors: CrewMember[];
	public cast: CastMember[];
	public createdAt: Date;
	public updatedAt: Date;

	private constructor(props: IMovie, id?: string) {
		this.id = id ?? randomUUID();
		this.tmdbId = props.tmdbId;
		this.title = props.title;
		this.originalTitle = props.originalTitle;
		this.overview = props.overview;
		this.releaseDate = props.releaseDate;
		this.posterPath = props.posterPath;
		this.backdropPath = props.backdropPath;
		this.genres = props.genres;
		this.runtime = props.runtime;
		this.budget = props.budget;
		this.revenue = props.revenue;
		this.certification = props.certification;
		this.directors = props.directors;
		this.cast = props.cast;
		this.createdAt = props.createdAt ?? new Date();
		this.updatedAt = props.updatedAt ?? new Date();
	}

	public static create(props: IMovie, id?: string) {
		return new Movie(props, id);
	}
}
