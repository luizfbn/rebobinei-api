export const userProfileUpdateBodySchema = {
	type: 'object',
	properties: {
		name: { type: 'string', minLength: 1, maxLength: 50, pattern: '.*\\S.*' },
		username: {
			type: 'string',
			minLength: 3,
			maxLength: 15,
			pattern: '^[a-zA-Z0-9_]+$',
		},
	},
	minProperties: 1,
} as const;

export interface UserProfileUpdateInputDTO {
	userId: string;
	name?: string;
	username?: string;
}
