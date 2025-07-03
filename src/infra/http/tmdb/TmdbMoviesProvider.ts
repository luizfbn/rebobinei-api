import { Movie } from '../../../modules/movies/movie.entity';
import {
	IMoviesProvider,
	ListParams,
} from '../../../modules/movies/providers/IMoviesProvider';
import { tmdbApiClient } from './tmdb-api-client';
import { TmdbListResponseDTO, TmdbMovieResultDTO } from './tmdb-api.types';

export class TmdbMoviesProvider implements IMoviesProvider {
	public async getPopular(params: ListParams) {
		return this.fetchMovieList('/movie/popular', params);
	}

	public async getTrending(params: ListParams) {
		return this.fetchMovieList('/trending/movie/day', params);
	}

	public async getUpcoming(params: ListParams) {
		return this.fetchMovieList('/movie/upcoming', params);
	}

	private async fetchMovieList(endpoint: string, params: ListParams) {
		try {
			const response = await tmdbApiClient.get<
				TmdbListResponseDTO<TmdbMovieResultDTO>
			>(endpoint, { params });

			const apiMovies = response.data.results;
			const movies = apiMovies.map((apiMovie) => {
				const movieProps = {
					tmdbId: apiMovie.id,
					title: apiMovie.title,
					originalTitle: apiMovie.original_title,
					overview: apiMovie.overview,
					releaseDate: apiMovie.release_date,
					posterUrl: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
					backdropUrl: `https://image.tmdb.org/t/p/original${apiMovie.backdrop_path}`,
				};
				return Movie.create(movieProps);
			});
			return movies;
		} catch (error) {
			console.error(`Error fetching data from endpoint ${endpoint}:`, error);
			return [];
		}
	}
}
