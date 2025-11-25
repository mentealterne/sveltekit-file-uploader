import type { ColumnDef } from '@tanstack/table-core';
import type { ResourceWithRelations } from '$lib/types/resource';
import { renderComponent } from '$lib/components/ui/data-table';
import BaseButton from '$lib/components/composed/BaseButton.svelte';
import BaseBadge from '$lib/components/composed/BaseBadge.svelte';

export const columns: ColumnDef<ResourceWithRelations>[] = [
	{
		accessorKey: 'title',
		header: 'Title'
	},
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'category.name',
		header: 'Category'
	},
	{
		accessorKey: 'provider.name',
		header: 'Provider'
	},
	{
		accessorKey: 'language.name',
		header: 'Language'
	},
	{
		accessorKey: 'roles',
		header: 'Roles',
		cell: ({ row }) => row.original.roles.map((role) => role.name).join(', ')
	},

	{
		accessorKey: 'fileType',
		header: 'Content Type',
		cell: ({ row }) => renderComponent(BaseBadge, { label: row.original.fileType.toLowerCase() })
	},
	{
		accessorKey: 'fileUrl',
		header: 'Resource file',
		cell: ({ row }) =>
			renderComponent(BaseButton, {
				href: `/resources/view-file/${row.original.id}`,
				variant: 'outline',
				label: 'View'
			})
	}
];
