import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { movieListController } from '../../../modules/movies/use-cases/movie-list/movie-list.factory';
import { movieDetailsController } from '../../../modules/movies/use-cases/movie-details/movie-details.factory';
import { movieSearchController } from '../../../modules/movies/use-cases/movie-search/movie-search.factory';
import { reviewStatsByMovieController } from '../../../modules/reviews/use-cases/review-stats-movie/review-stats-movie.factory';
import { reviewCreationController } from '../../../modules/reviews/use-cases/review-creation/review-creation.factory';
import { reviewListByMovieController } from '../../../modules/reviews/use-cases/review-list-movie/review-list-movie.factory';
import {
	MovieListRoute,
	movieListRouteSchema,
} from '../../../modules/movies/use-cases/movie-list/movie-list.schema';
import {
	MovieDetailsRoute,
	movieDetailsRouteSchema,
} from '../../../modules/movies/use-cases/movie-details/movie-details.schema';
import {
	MovieSearchRoute,
	movieSearchRouteSchema,
} from '../../../modules/movies/use-cases/movie-search/movie-search.schema';
import {
	ReviewStatsByMovieRoute,
	reviewStatsByMovieRouteSchema,
} from '../../../modules/reviews/use-cases/review-stats-movie/review-stats-movie.schema';
import {
	ReviewCreationRoute,
	reviewCreationRouteSchema,
} from '../../../modules/reviews/use-cases/review-creation/review-creation.schema';
import {
	ReviewListByMovieRoute,
	reviewListByMovieSchema,
} from '../../../modules/reviews/use-cases/review-list-movie/review-list-movie.schema';

export async function movieRoutes(app: FastifyInstance) {
	app.get<MovieListRoute>(
		'/movies',
		{
			schema: movieListRouteSchema,
		},
		(request, reply) => movieListController.handle(request, reply)
	);
	app.get<MovieSearchRoute>(
		'/movies/search',
		{
			schema: movieSearchRouteSchema,
		},
		(request, reply) => movieSearchController.handle(request, reply)
	);
	app.get<MovieDetailsRoute>(
		'/movies/:id',
		{
			schema: movieDetailsRouteSchema,
		},
		(request, reply) => movieDetailsController.handle(request, reply)
	);
	app.get<ReviewListByMovieRoute>(
		'/movies/:id/reviews',
		{
			schema: reviewListByMovieSchema,
		},
		(request, reply) => reviewListByMovieController.handle(request, reply)
	);
	app.post<ReviewCreationRoute>(
		'/movies/:id/reviews',
		{
			onRequest: [ensureAuthenticated],
			schema: reviewCreationRouteSchema,
		},
		(request, reply) => reviewCreationController.handle(request, reply)
	);
	app.get<ReviewStatsByMovieRoute>(
		'/movies/:id/stats',
		{
			schema: reviewStatsByMovieRouteSchema,
		},
		(request, reply) => reviewStatsByMovieController.handle(request, reply)
	);
}
