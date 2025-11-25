<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props {
		label: string;
		disabled?: boolean;
		href?: string;
		onClick?: () => void;

	}

	let props: Props = $props();
</script>

<Button
	disabled={props.disabled}
	href={props.href}
	onclick={props.onClick}

	variant="primary">
	{props.label}
</Button>
