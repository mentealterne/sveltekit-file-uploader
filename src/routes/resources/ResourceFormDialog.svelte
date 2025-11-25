<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { ResourceSchema } from '$lib/schemas/resource.schema';
	import { formDialogState } from './formDialogState.svelte';

	interface Props {
		data: SuperValidated<Infer<ResourceSchema>>;
	}

	let { data }: Props = $props();

</script>

<Dialog.Root bind:open={formDialogState.isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: "primary" })}
	>Upload
	</Dialog.Trigger
	>
	<Dialog.Content class="w-1/2">
		<Dialog.Header>
			<Dialog.Title>Upload resource</Dialog.Title>

		</Dialog.Header>
		{#await import('./ResourceForm.svelte') then { default: ResourceForm }}
			<ResourceForm data={data} />
		{/await}
	</Dialog.Content>
</Dialog.Root>
