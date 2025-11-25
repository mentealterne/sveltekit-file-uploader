import { Prisma } from 'prisma-generated/client';

export type ResourceWithRelations = Prisma.ResourceGetPayload<{
	include: {
		category: true;
		provider: true;
		roles: true;
		language: true;
	};
}>;
