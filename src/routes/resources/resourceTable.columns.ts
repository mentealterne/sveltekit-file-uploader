import type { ColumnDef } from '@tanstack/table-core';
import type { ResourceWithRelations } from '$lib/types/resource';
import { renderComponent } from '$lib/components/ui/data-table';
import BaseButton from '$lib/components/composed/BaseButton.svelte';

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
		accessorKey: 'fileUrl',
		header: 'Resource file',
		cell: ({ row }) =>
			renderComponent(BaseButton, {
				href: row.original.fileUrl,
				variant: 'outline',
				label: 'View'
			})
	}
];
