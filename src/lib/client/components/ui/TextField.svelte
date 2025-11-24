<script lang="ts">
	interface TextInputProps {
		name: string;
		id: string;
		placeholder: string;
		required: boolean;
	}

	const props: TextInputProps = $props();

</script>

<input
	type="text"
	name={props.name}
	id={props.id}
	placeholder={props.placeholder}
	required ={props.required}
	class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
/>
