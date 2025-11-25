import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	const languages = await prisma.language.findMany();
	return json(languages);
}
