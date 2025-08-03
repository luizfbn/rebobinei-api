import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting the seed process...');

	const adminEmail = 'admin@admin.com';
	const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

	if (!adminPassword) {
		throw new Error(
			'The variable ADMIN_INITIAL_PASSWORD must be set in the .env file.'
		);
	}

	const existingAdmin = await prisma.user.findUnique({
		where: { email: adminEmail },
	});

	if (existingAdmin) {
		console.log('Admin user already exists. No action needed.');
	} else {
		const hashedPassword = await bcrypt.hash(adminPassword, 12);
		const adminUser = await prisma.user.create({
			data: {
				email: adminEmail,
				username: 'admin',
				name: 'Admin',
				password: hashedPassword,
				role: Role.ADMIN,
			},
		});
		console.log(`Admin user created successfully: ${adminUser.email}`);
	}
	console.log('Seed process finished.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
