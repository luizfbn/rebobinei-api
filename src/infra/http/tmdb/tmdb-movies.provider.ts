import { isAxiosError } from 'axios';
import { MovieMapper } from '../../../modules/movies/movie.mapper';
import { tmdbApiClient } from './tmdb-api-client';
import {
	TmdbListResponseDTO,
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
} from './tmdb-api.types';
import {
	IMoviesProvider,
	ListParams,
	DetailsParams,
} from '../../../modules/movies/providers/movies.provider.interface';

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

	public async getDetailsById(params: DetailsParams) {
		const { id, language } = params;
		const requestConfig = {
			params: {
				...(language && { language }),
			},
		};
		try {
			const response = await tmdbApiClient.get<TmdbMovieDetailsDTO>(
				`/movie/${id}`,
				requestConfig
			);
			const apiMovie = response.data;
			const movie = MovieMapper.fromApiDetailsToEntity(apiMovie);
			return movie;
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 404) {
				return null;
			}
			console.error(`Error fetching data from endpoint /movie/${id}`, error);
			throw error;
		}
	}

	private async fetchMovieList(endpoint: string, params: ListParams) {
		try {
			const response = await tmdbApiClient.get<
				TmdbListResponseDTO<TmdbMovieDTO>
			>(endpoint, { params });

			const apiMovies = response.data.results;
			const movies = apiMovies.map((apiMovie) => {
				return MovieMapper.fromApiListItemToEntity(apiMovie);
			});
			return movies;
		} catch (error) {
			console.error(`Error fetching data from endpoint ${endpoint}:`, error);
			throw error;
		}
	}
}
