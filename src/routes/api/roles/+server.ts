import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	const roles = await prisma.role.findMany();
	return json(roles);
}
