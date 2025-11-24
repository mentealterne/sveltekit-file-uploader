<script lang="ts">
import TextField from '$lib/client/components/ui/TextField.svelte';
import BaseSelect from '$lib/client/components/ui/BaseSelect.svelte';
import { categories, languages, providers } from '$lib/mocks/data';
</script>

<form method="POST" action="?/create" class="space-y-6">

	<div class="flex flex-col gap-4">
	<TextField
		name="title"
		id="title"
		placeholder="Resource Title"
		required={true}
	/>
	<TextField
		name="description"
		id="description"
		placeholder="Description"
		required={true}
	/>
		<BaseSelect placeholder="Choose category" name="category" id="category" options={categories.map(category => { return {value: category.id,label:category.name}})} />
		<BaseSelect placeholder="Choose language" name="language" id="language" options={languages.map(language => { return {value: language.code,label:language.name}})} />
		<BaseSelect placeholder="Choose provider" name="provider" id="provider" options={providers.map(provider => { return {value: provider.id.toString(),label:provider.name}})} />

	</div>
</form>
