import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({
	adapter
});

const categories: Prisma.CategoryCreateInput[] = [
	{ name: 'Leadership' },
	{ name: 'Productivity' },
	{ name: 'Communication' },
	{ name: 'Creativity' },
	{ name: 'Wellness' }
];

const languages: Prisma.LanguageCreateInput[] = [
	{ code: 'en', name: 'English' },
	{ code: 'es', name: 'Spanish' },
	{ code: 'fr', name: 'French' },
	{ code: 'it', name: 'Italian' }
];

const providers: Prisma.ProviderCreateInput[] = [
	{ name: 'Linkedin' },
	{ name: 'Mentor' },
	{ name: 'Pack' },
	{ name: 'Skilla' }
];

const roles: Prisma.RoleCreateInput[] = [{ name: 'Mentor/Coach' }, { name: 'Mentee/Coachee' }];

export async function main() {
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
}

main();
