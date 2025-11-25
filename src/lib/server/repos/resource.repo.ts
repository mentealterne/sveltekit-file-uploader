import prisma from '$lib/prisma';
import type { ResourceCreateInput } from 'prisma-generated/models/Resource';
import type { ResourceWithRelations } from '$lib/types/resource';

export const ResourceRepo = {
	create: async (data: ResourceCreateInput) => {
		return prisma.resource.create({ data });
	},
	list: async (): Promise<ResourceWithRelations[]> => {
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
