import prisma from '$lib/prisma';
import type { ResourceCreateInput } from 'prisma-generated/models/Resource';
import { Prisma } from 'prisma-generated/client';

export const ResourceRepo = {
	create: async (data: ResourceCreateInput) => {
		return prisma.resource.create({ data });
	},
	list: async (): Promise<
		Prisma.ResourceGetPayload<{
			include: {
				category: true;
				provider: true;
				roles: true;
				language: true;
			};
		}>[]
	> => {
		return prisma.resource.findMany({
			include: {
				category: true,
				provider: true,
				roles: true,
				language: true
			}
		});
	}
};
