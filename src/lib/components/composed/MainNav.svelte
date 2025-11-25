<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import logo from '$lib/assets/logo.png';
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/users', label: 'Users' },
		{ href: '/feedbacks', label: 'Feedbacks' },
		{ href: '/programs', label: 'Programs' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/counterparties', label: 'Counterparties' },
		{ href: '/events', label: 'Events' }

	];
</script>

<header class="flex items-center justify-between h-full w-full bg-white">
	<img alt="Logo" class=" w-24 mr-4" src={logo} />
	<NavigationMenu.Root viewport={false}>
		<NavigationMenu.List>
			{#each links as link(link)}
				<NavigationMenu.Item>

					<NavigationMenu.Link href={link.href}
															 class={["text-lg rounded-none  font-semibold text-gray-500 px-4 py-2 hover:border-b-2 hover:border-orange-400"
															 , page.url.pathname === link.href && 'border-b-2 border-orange-400 text-gray-800']}>
						{link.label}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			{/each}
		</NavigationMenu.List>
	</NavigationMenu.Root>
</header>

