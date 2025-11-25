<script>
	let { data } = $props();

</script>

{#await import('$lib/components/ResourceForm.svelte') then { default: ResourceForm }}
	<ResourceForm action="?/create" data={data.form} />
{/await}

