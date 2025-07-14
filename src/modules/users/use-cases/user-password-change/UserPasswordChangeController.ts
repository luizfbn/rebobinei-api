import { FastifyRequest, FastifyReply } from 'fastify';
import { UserPasswordChangeUseCase } from './UserPasswordChangeUseCase';
import { UserPasswordChangeInputDTO } from './user-password-change.dto';
import { InvalidCredentialsError } from '../../../../core/errors/invalid-credentials-error';

export class UserPasswordChangeController {
	constructor(private userPasswordChangeUseCase: UserPasswordChangeUseCase) {}

	async handle(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { currentPassword, newPassword, passwordConfirmation } =
				request.body as UserPasswordChangeInputDTO & {
					passwordConfirmation: string;
				};

			if (newPassword !== passwordConfirmation) {
				return reply.status(400).send({
					error: 'The new password and confirmation do not match.',
				});
			}

			const userId = request.user.sub;

			await this.userPasswordChangeUseCase.execute({
				userId,
				currentPassword,
				newPassword,
			});

			return reply.status(204).send();
		} catch (error) {
			if (error instanceof InvalidCredentialsError) {
				return reply.status(401).send({ error: error.message });
			}

			throw error;
		}
	}
}
