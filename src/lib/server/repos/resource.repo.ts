import prisma from '$lib/prisma';
import type { ResourceCreateInput } from 'prisma-generated/models/Resource';
import type { ResourceWithRelations } from '$lib/types/resource';
import { Prisma } from 'prisma-generated/client';

export const ResourceRepo = {
	create: async (data: ResourceCreateInput) => {
		return prisma.resource.create({ data });
	},
	list: async (where?: Prisma.ResourceWhereInput): Promise<ResourceWithRelations[]> => {
		return prisma.resource.findMany({
			where,
			include: {
				category: true,
				provider: true,
				roles: true,
				language: true
			}
		});
	},
	getById: async (id: string): Promise<ResourceWithRelations | null> => {
		return prisma.resource.findUnique({
			where: { id },
			include: {
				category: true,
				provider: true,
				roles: true,
				language: true
			}
		});
	}
};
