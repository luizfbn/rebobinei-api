import axios from 'axios';
import { env } from '../../../core/config/env';

export const tmdbApiClient = axios.create({
	baseURL: env.TMDB_API_BASE_URL,
	params: {
		api_key: env.TMDB_API_KEY,
	},
});
