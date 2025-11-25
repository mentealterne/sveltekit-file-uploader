<script lang="ts">
	import { FileX } from 'phosphor-svelte';
	import BaseButton from '$lib/components/composed/base-button.svelte';

	export let data;

	const src = `data:${data.mimeType};base64,${data.base64}`;
</script>

<div class="bg-white p-4 rounded shadow-lg flex flex-col gap-4">

	{#if data.mimeType === "application/pdf"}
		<iframe title="pdf-viewer" src={src} class="w-full h-screen rounded border"></iframe>

	{:else if data.mimeType?.startsWith("image/")}
		<img src={src} alt={data.resource.title} class="max-w-full mx-auto rounded shadow" />

	{:else if data.mimeType?.startsWith("video/")}
		<video
			controls
			class="w-full max-h-[80vh] rounded shadow"
			src={src}
		>
			<track src={src} kind="captions" />
			Your browser does not support the video tag.
		</video>

	{:else}
		<div class="flex flex-col items-center justify-center w-full py-10 text-center gap-4">
			<FileX size="64" weight="light" class="text-gray-500" />

			<p class="text-gray-500 text-lg font-medium max-w-lg leading-relaxed">
				Unfortunately, the file viewer does not support this file type yet.
				You can download the file using the button below.
				PDFs, images, and videos can be previewed directly here.
			</p>
		</div>
	{/if}

	<div class="flex justify-center mt-4">
		<BaseButton href={src} label="Download file" />
	</div>
</div>
