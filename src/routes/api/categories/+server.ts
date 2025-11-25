import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	const categories = await prisma.category.findMany();
	return json(categories);
}
