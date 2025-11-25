<script>
	import ResourceTable from './ResourceTable.svelte';
	import ResourceFormDialog from './ResourceFormDialog.svelte';

	let { data } = $props();


</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-end">
		<ResourceFormDialog data={data.form} />
	</div>
	<ResourceTable resources={data.resources} />
</div>


