export const messages = {
	'en-US': {
		/* ERRORS */

		invalidAuthToken: 'Invalid or missing authentication token.',
		invalidCredentials: 'Invalid credentials.',
		internalError: 'An internal error occurred.',
		permissionDenied: 'Permission denied.',
		resourceNotFound: 'Resource not found.',
		userAlreadyExists: 'User already exists.',
		userAlreadyReviewed: 'User already reviewed this movie.',

		/* SCHEMAS (validation) */

		// pagination (page)
		pageRequiredNumber: 'A number is required for page.',
		pageMustBeInteger: 'Page number must be an integer.',
		pageMin: 'The minimum page number is 1.',

		// pagination (limit)
		pageLimitRequiredNumber: 'A number is required for limit.',
		pageLimitMustBeInteger: 'Items per page must be an integer.',
		pageLimitMin: 'The minimum number of items per page is 1.',
		pageLimitMax: 'The maximum number of items per page is 100.',

		// movie id
		movieIdPositive: 'Movie ID must be a positive number.',

		// user id
		invalidUserId: 'Invalid user ID.',

		// review id
		invalidReviewId: 'Invalid review ID.',

		// rating body
		ratingMustBeInteger1To5: 'Rating must be an integer from 1 to 5.',

		// rating query
		ratingRequiredNumber: 'Rating must be a number.',
		ratingMustBeInteger: 'Rating must be an integer.',
		ratingMin: 'The minimum rating is 1.',
		ratingMax: 'The maximum rating is 5.',

		// email
		invalidEmailFormat: 'Invalid email format.',

		// name
		nameNotEmpty: 'Name cannot be empty.',
		nameMaxLength: 'Name cannot be longer than 50 characters.',

		// password
		passwordMinLength: 'The password must be at least 6 characters long.',

		// username
		usernameMinLength: 'Username must be at least 3 characters long.',
		usernameMaxLength: 'Username cannot be longer than 15 characters.',
		usernameRegex:
			'Username can only contain letters, numbers, and underscores (no spaces).',
	},
	'pt-BR': {
		/* ERRORS */

		invalidAuthToken: 'Token de autenticação inválido ou ausente.',
		invalidCredentials: 'Credenciais inválidas.',
		internalError: 'Ocorreu um erro interno.',
		permissionDenied: 'Permissão negada.',
		resourceNotFound: 'Recurso não encontrado.',
		userAlreadyExists: 'Usuário já existe.',
		userAlreadyReviewed: 'O usuário já avaliou este filme.',

		/* SCHEMAS (validation) */

		// pagination (page)
		pageRequiredNumber: 'Um número é obrigatório para a página.',
		pageMustBeInteger: 'O número da página deve ser um inteiro.',
		pageMin: 'O número mínimo da página é 1.',

		// pagination (limit)
		pageLimitRequiredNumber: 'Um número é obrigatório para o limite.',
		pageLimitMustBeInteger: 'Itens por página deve ser um inteiro.',
		pageLimitMin: 'O número mínimo de itens por página é 1.',
		pageLimitMax: 'O número máximo de itens por página é 100.',

		// movie id
		movieIdPositive: 'O ID do filme deve ser um número positivo.',

		// user id
		invalidUserId: 'ID do usuário inválido.',

		// review id
		invalidReviewId: 'ID da avaliação inválido.',

		// rating body
		ratingMustBeInteger1To5: 'A avaliação deve ser um inteiro de 1 a 5.',

		// rating query
		ratingRequiredNumber: 'A avaliação deve ser um número.',
		ratingMustBeInteger: 'A avaliação deve ser um inteiro.',
		ratingMin: 'A avaliação mínima é 1.',
		ratingMax: 'A avaliação máxima é 5.',

		// email
		invalidEmailFormat: 'Formato de e-mail inválido.',

		// name
		nameNotEmpty: 'O nome não pode estar vazio.',
		nameMaxLength: 'O nome não pode ter mais de 50 caracteres.',

		// password
		passwordMinLength: 'A senha deve ter pelo menos 6 caracteres.',

		// username
		usernameMinLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
		usernameMaxLength: 'O nome de usuário não pode ter mais de 15 caracteres.',
		usernameRegex:
			'O nome de usuário só pode conter letras, números e underscores (sem espaços).',
	},
} as const;
