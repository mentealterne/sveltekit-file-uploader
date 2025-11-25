<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';

	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<Badge variant="secondary">{label}</Badge>
