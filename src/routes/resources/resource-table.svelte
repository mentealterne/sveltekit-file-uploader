<script lang="ts">
	import { columns } from './resourceTable.columns.js';
	import DataTable from '$lib/components/composed/data-table.svelte';
	import type { ResourceWithRelations } from '$lib/types/resource';

	interface Props {
		resources: ResourceWithRelations[];
	}

	let { resources }: Props = $props();
</script>

<DataTable {columns} data={resources} />

