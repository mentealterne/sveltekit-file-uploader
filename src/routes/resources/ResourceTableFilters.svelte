<script lang="ts">
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { ChartBar } from 'phosphor-svelte';

	const types = ['all', 'videos', 'images', 'documents'];

	let current = page.url.searchParams.get('type') ?? 'all';

	function selectTab(type: string) {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`?type=${type}`, { replaceState: true });
	}
</script>

<Tabs class="flex flex-row items-center justify-center" value={current}>
	<ChartBar class="text-orange-600 mr-2" size="20" />
	<TabsList class=" rounded-none text-gray-200 bg-transparent shadow-none flex gap-6">
		{#each types as t(t)}
			<TabsTrigger class="text-gray-500" value={t} onclick={() => selectTab(t)}>
				{t.charAt(0).toUpperCase() + t.slice(1)}
			</TabsTrigger>
		{/each}
	</TabsList>
</Tabs>
