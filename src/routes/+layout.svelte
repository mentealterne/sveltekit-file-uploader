<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import MainNav from '$lib/components/composed/main-nav.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<link href={favicon} rel="icon" />
</svelte:head>
<Toaster position="top-center" richColors />

<div class="flex flex-col min-h-screen bg-gray-100">
	<div class="flex h-[80px] w-full shadow-md items-center bg-white px-4">
		<MainNav />
	</div>
	<div class="flex-grow container mx-auto px-4 py-6">
		{@render children()}
	</div>
</div>
