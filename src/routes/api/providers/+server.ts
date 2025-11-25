import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	const providers = await prisma.provider.findMany();
	return json(providers);
}
