export const messages = {
	'en-US': {
		loginSuccess: 'Login successful.',
		logoutSuccess: 'Logout successful.',

		/* ERRORS */

		invalidAuthToken: 'Invalid or missing authentication token.',
		invalidCredentials: 'Invalid credentials.',
		internalError: 'An internal error occurred.',
		permissionDenied: 'Permission denied.',
		resourceNotFound: 'Resource not found.',
		userNotFound: 'User not found.',
		movieNotFound: 'Movie not found.',
		reviewNotFound: 'Review not found.',
		userAlreadyExists: 'User already exists.',
		userAlreadyReviewed: 'User already reviewed this movie.',
		userWithEmailAlreadyExists: 'An user with this email already exists.',
		userWithUsernameAlreadyExists: 'An user with this username already exists.',
		wrongPassword: 'Incorrect password.',

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
		reviewMaxLength: 'Review cannot be longer than 2000 characters.',

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
		invalidPassword: 'Invalid password.',
		passwordMinLength: 'The password must be at least 6 characters long.',
		passwordMaxLength: 'The password cannot be longer than 64 characters.',
		newPasswordMinLength:
			'The new password must be at least 6 characters long.',
		newPasswordMaxLength:
			'The new password cannot be longer than 64 characters.',
		passwordConfirmationMinLength:
			'The password confirmation must be at least 6 characters long.',
		passwordConfirmationMaxLength:
			'The password confirmation cannot be longer than 64 characters.',

		// username
		usernameMinLength: 'Username must be at least 3 characters long.',
		usernameMaxLength: 'Username cannot be longer than 30 characters.',
		usernameRegex:
			'Username can only contain letters, numbers, and underscores (no spaces).',
	},
	'pt-BR': {
		loginSuccess: 'Login realizado com sucesso.',
		logoutSuccess: 'Logout realizado com sucesso.',

		/* ERRORS */

		invalidAuthToken: 'Token de autenticação inválido ou ausente.',
		invalidCredentials: 'Credenciais inválidas.',
		internalError: 'Ocorreu um erro interno.',
		permissionDenied: 'Permissão negada.',
		resourceNotFound: 'Recurso não encontrado.',
		userNotFound: 'Usuário não encontrado.',
		movieNotFound: 'Filme não encontrado.',
		reviewNotFound: 'Avaliação não encontrada.',
		userAlreadyExists: 'Usuário já existe.',
		userAlreadyReviewed: 'O usuário já avaliou este filme.',
		userWithEmailAlreadyExists: 'Um usuário com esse email já existe.',
		userWithUsernameAlreadyExists:
			'Um usuário com esse nome de usuário já existe.',
		wrongPassword: 'Senha incorreta.',

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
		reviewMaxLength: 'A avaliação não pode ter mais de 2000 caracteres.',

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
		invalidPassword: 'Senha inválida.',
		passwordMinLength: 'A senha deve ter pelo menos 6 caracteres.',
		passwordMaxLength: 'A senha não pode ter mais de 64 caracteres.',
		newPasswordMinLength: 'A nova senha deve ter pelo menos 6 caracteres.',
		newPasswordMaxLength: 'A nova senha não pode ter mais de 64 caracteres.',
		passwordConfirmationMinLength:
			'A confirmação de senha deve ter pelo menos 6 caracteres.',
		passwordConfirmationMaxLength:
			'A confirmação de senha não pode ter mais de 64 caracteres.',

		// username
		usernameMinLength: 'O nome de usuário deve ter pelo menos 3 caracteres.',
		usernameMaxLength: 'O nome de usuário não pode ter mais de 30 caracteres.',
		usernameRegex:
			'O nome de usuário só pode conter letras, números e underscores (sem espaços).',
	},
} as const;
