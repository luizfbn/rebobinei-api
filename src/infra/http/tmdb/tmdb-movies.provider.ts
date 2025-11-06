import { isAxiosError } from 'axios';
import { env } from '../../../core/config/env';
import { MovieMapper } from '../../../modules/movies/movie.mapper';
import { tmdbApiClient } from './tmdb-api-client';
import {
	TmdbListResponseDTO,
	TmdbMovieCreditsDTO,
	TmdbMovieDetailsDTO,
	TmdbMovieDTO,
	TmdbMovieReleaseDatesDTO,
} from './tmdb-api.interfaces';
import {
	MoviesProvider,
	ListParams,
	DetailsParams,
	SearchParams,
} from '../../../modules/movies/providers/movies.provider.interface';

export class TmdbMoviesProvider implements MoviesProvider {
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
			const [detailsResponse, releaseDatesResponse, creditsResponse] =
				await Promise.all([
					tmdbApiClient.get<TmdbMovieDetailsDTO>(`/movie/${id}`, {
						params: { language },
					}),
					tmdbApiClient.get<TmdbMovieReleaseDatesDTO>(
						`/movie/${id}/release_dates`
					),
					tmdbApiClient.get<TmdbMovieCreditsDTO>(`/movie/${id}/credits`),
				]);
			const apiMovieDetails = detailsResponse.data;
			const apiReleaseDates = releaseDatesResponse.data;
			const apiMovieCredits = creditsResponse.data;

			const certification = this.findCertificationForRegion(
				apiReleaseDates,
				regionCode
			);

			const directors = this.findDirectors(apiMovieCredits.crew);
			const cast = this.mapTopCast(apiMovieCredits.cast);

			const movie = MovieMapper.toEntityfromApiDetails(
				apiMovieDetails,
				certification,
				directors,
				cast
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

	public async searchByTitle(params: SearchParams) {
		return this.fetchMovieList('/search/movie', params);
	}

	private async fetchMovieList(endpoint: string, params: ListParams) {
		try {
			const response = await tmdbApiClient.get<
				TmdbListResponseDTO<TmdbMovieDTO>
			>(endpoint, { params });

			const apiResponseData = response.data;
			const movies = apiResponseData.results.map((apiMovie) => {
				return MovieMapper.toEntityFromApiListItem(apiMovie);
			});
			return {
				page: apiResponseData.page,
				totalPages: apiResponseData.total_pages,
				totalResults: apiResponseData.total_results,
				movies,
			};
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

	private findDirectors(crew: TmdbMovieCreditsDTO['crew']) {
		return crew
			.filter((member) => member.job === 'Director')
			.map((director) => ({
				tmdbId: director.id,
				name: director.name,
				department: director.department,
				job: director.job,
				profileUrl: director.profile_path
					? `${env.TMDB_IMAGE_BASE_URL}/w500${director.profile_path}`
					: null,
			}));
	}

	private mapTopCast(cast: TmdbMovieCreditsDTO['cast']) {
		return cast.slice(0, 10).map((member) => ({
			tmdbId: member.id,
			name: member.name,
			character: member.character,
			profileUrl: member.profile_path
				? `${env.TMDB_IMAGE_BASE_URL}/w500${member.profile_path}`
				: null,
		}));
	}
}
