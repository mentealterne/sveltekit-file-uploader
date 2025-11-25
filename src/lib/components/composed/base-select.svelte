<script lang="ts">
	import * as Select from "$lib/components/ui/select";

	interface Props {
		options: { value: string; label: string }[];
		name: string;
		placeholder: string;
		value?:string
	}
	let { options, name, placeholder,  value = $bindable() }: Props = $props();
	const selectedLabel = $derived(
		options.find(o => o.value === value)?.label ?? null
	);
</script>

	<Select.Root type="single" {name}  bind:value>
		<Select.Trigger class="w-full">{selectedLabel ?? placeholder}</Select.Trigger>
		<Select.Content>
			{#each options as option(option.value)}
				<Select.Item value={option.value} label={option.label}/>
			{/each}
		</Select.Content>
	</Select.Root>

