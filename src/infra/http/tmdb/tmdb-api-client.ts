import axios from 'axios';

export const tmdbApiClient = axios.create({
	baseURL: process.env.TMDB_API_BASE_URL,
	params: {
		api_key: process.env.TMDB_API_KEY,
	},
});
