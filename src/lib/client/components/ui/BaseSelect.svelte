<script lang="ts">
	interface Props {
		options: { value: string; label: string }[];
		multiple?: boolean;
		name: string;
		id: string;
		placeholder: string;

	}

	const props: Props = $props();
</script>

<select name={props.name} id={props.id} placeholder={props.placeholder} multiple={props.multiple} class="mt-1 block w-full border border-gray-300 text-lg rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ">
	{#each props.options as option(option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
