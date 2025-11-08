import { FastifyInstance } from 'fastify';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { reviewDeletionController } from '../../../modules/reviews/use-cases/review-deletion/review-deletion.factory';
import { reviewDetailsController } from '../../../modules/reviews/use-cases/review-details/review-details.factory';
import { reviewListController } from '../../../modules/reviews/use-cases/review-list/review-list.factory';
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
}
