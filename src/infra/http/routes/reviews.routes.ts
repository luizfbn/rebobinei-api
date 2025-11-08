import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { reviewDeletionController } from '../../../modules/reviews/use-cases/review-deletion/review-deletion.factory';
import { reviewDetailsController } from '../../../modules/reviews/use-cases/review-details/review-details.factory';
import { reviewListController } from '../../../modules/reviews/use-cases/review-list/review-list.factory';
import { reviewDetailsByUserAndMovieController } from '../../../modules/reviews/use-cases/review-details-user-movie/review-details-user-movie.factory';
import {
	ReviewDeletionRoute,
	reviewDeletionRouteSchema,
} from '../../../modules/reviews/use-cases/review-deletion/review-deletion.schema';
import {
	ReviewDetailsRoute,
	reviewDetailsRouteSchema,
} from '../../../modules/reviews/use-cases/review-details/review-details.schema';
import {
	ReviewListRoute,
	reviewListRouteSchema,
} from '../../../modules/reviews/use-cases/review-list/review-list.schema';
import {
	ReviewDetailsByUserAndMovieRoute,
	reviewDetailsByUserAndMovieRouteSchema,
} from '../../../modules/reviews/use-cases/review-details-user-movie/review-details-user-movie.schema';

export async function reviewRoutes(app: FastifyInstance) {
	app.get<ReviewListRoute>(
		'/reviews',
		{ schema: reviewListRouteSchema },
		(request, reply) => reviewListController.handle(request, reply)
	);
	app.get<ReviewDetailsRoute>(
		'/reviews/:id',
		{ schema: reviewDetailsRouteSchema },
		(request, reply) => reviewDetailsController.handle(request, reply)
	);
	app.delete<ReviewDeletionRoute>(
		'/reviews/:id',
		{ onRequest: [ensureAuthenticated], schema: reviewDeletionRouteSchema },
		(request, reply) => reviewDeletionController.handle(request, reply)
	);
	app.get<ReviewDetailsByUserAndMovieRoute>(
		'/reviews/by-user-and-movie',
		{ schema: reviewDetailsByUserAndMovieRouteSchema },
		(request, reply) =>
			reviewDetailsByUserAndMovieController.handle(request, reply)
	);
}
