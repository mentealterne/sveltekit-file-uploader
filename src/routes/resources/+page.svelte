<script>
	import ResourceTable from './resource-table.svelte';
	import ResourceFormDialog from './resource-form-dialog.svelte';
	import ResourceTableFilters from './resource-table-filters.svelte';

	let { data } = $props();
</script>

<div class="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg">
	<div class="flex justify-between space-between w-full">
		<ResourceTableFilters />
		<ResourceFormDialog data={data.form} />
	</div>
	<ResourceTable resources={data.resources} />
</div>


