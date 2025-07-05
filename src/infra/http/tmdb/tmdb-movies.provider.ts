import { isAxiosError } from 'axios';
import { MovieMapper } from '../../../modules/movies/movie.mapper';
import { tmdbApiClient } from './tmdb-api-client';
import {
	TmdbListResponseDTO,
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
	TmdbMovieReleaseDatesDTO,
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
		const regionCode = language.split('-')[1].toUpperCase();
		try {
			const [detailsResponse, releaseDatesResponse] = await Promise.all([
				tmdbApiClient.get<TmdbMovieDetailsDTO>(`/movie/${id}`, {
					params: { language },
				}),
				tmdbApiClient.get<TmdbMovieReleaseDatesDTO>(
					`/movie/${id}/release_dates`
				),
			]);
			const apiMovieDetails = detailsResponse.data;
			const apiReleaseDates = releaseDatesResponse.data;

			const certification = this.findCertificationForRegion(
				apiReleaseDates,
				regionCode
			);

			const movie = MovieMapper.fromApiDetailsToEntity(
				apiMovieDetails,
				certification
			);
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

	private findCertificationForRegion(
		apiReleaseDates: TmdbMovieReleaseDatesDTO,
		regionCode: string
	) {
		const regionReleaseInfo = apiReleaseDates.results.find(
			(country) => country.iso_3166_1 === regionCode
		);

		if (!regionReleaseInfo || regionReleaseInfo.release_dates.length === 0) {
			return;
		}

		const releaseWithCertification = regionReleaseInfo.release_dates.find(
			(release) =>
				release.type === 3 &&
				release.certification &&
				release.certification !== ''
		);

		return releaseWithCertification?.certification;
	}
}
