<script>
	import ResourceForm from '$lib/components/ResourceForm.svelte';
	let { data } = $props()
</script>


<ResourceForm data={data.form} action="?/create"  />
