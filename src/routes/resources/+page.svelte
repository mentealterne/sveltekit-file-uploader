<script>
	import ResourceTable from './ResourceTable.svelte';
	import ResourceFormDialog from './ResourceFormDialog.svelte';
	import ResourceTableFilters from './ResourceTableFilters.svelte';

	let { data } = $props();


</script>

<div class="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg">
	<div class="flex justify-between space-between w-full">
		<ResourceTableFilters />
		<ResourceFormDialog data={data.form} />
	</div>
	<ResourceTable resources={data.resources} />
</div>


