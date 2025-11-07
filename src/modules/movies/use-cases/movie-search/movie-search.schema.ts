import { z } from 'zod';
import { t } from '../../../../core/i18n';
import { tmdbPaginationSchema } from '../../../../core/schemas/tmdb-pagination.schema';

const querySchema = tmdbPaginationSchema.extend({
	query: z.string().min(1, { error: t('invalidQueryParam') }),
});

export const movieSearchRouteSchema = {
	querystring: querySchema,
};

export interface MovieSearchRoute {
	Querystring: z.infer<typeof querySchema>;
}

export type MovieSearchInputDTO = z.infer<typeof querySchema>;
