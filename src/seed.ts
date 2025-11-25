import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const categories = [
	{ name: 'Leadership' },
	{ name: 'Productivity' },
	{ name: 'Communication' },
	{ name: 'Creativity' },
	{ name: 'Wellness' }
];

const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'es', name: 'Spanish' },
	{ code: 'fr', name: 'French' },
	{ code: 'it', name: 'Italian' }
];

const providers = [{ name: 'Linkedin' }, { name: 'Mentor' }, { name: 'Pack' }, { name: 'Skilla' }];

const roles = [{ name: 'Mentor/Coach' }, { name: 'Mentee/Coachee' }];

export async function main() {
	try {
		for (const category of categories) {
			await prisma.category.create({ data: category });
		}

		for (const language of languages) {
			await prisma.language.create({ data: language });
		}

		for (const provider of providers) {
			await prisma.provider.create({ data: provider });
		}

		for (const role of roles) {
			await prisma.role.create({ data: role });
		}
	} catch (err) {
		console.error('Seed error:', err);
	} finally {
		await prisma.$disconnect();
	}
}

main();
