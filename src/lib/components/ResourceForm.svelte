<script lang="ts">
import BaseSelect from '$lib/components/composed/BaseSelect.svelte';
import { categories, languages, providers, roles } from '$lib/mocks/data';
import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
import { resourceSchema, type ResourceSchema } from '$lib/schemas/resource.schema';
import * as Form from "$lib/components/ui/form";
import { zod4Client } from 'sveltekit-superforms/adapters';
import SuperDebug from 'sveltekit-superforms';
import Input from './ui/input/input.svelte';
import MultipleSelect from '$lib/components/composed/MultipleSelect.svelte';

let { data, action } : { data : SuperValidated<Infer<ResourceSchema>>, action:string} = $props();

const form = superForm(data, {
	validators: zod4Client(resourceSchema),
	SPA: true
});

const {form:formData, constraints,enhance} = form;
const file = fileProxy(form, 'resourceFile');

</script>

<SuperDebug data={$formData} />
<form method="POST" enctype="multipart/form-data" action={action} class="space-y-6" use:enhance>
	<div class="flex flex-col gap-4">
		<Form.Field {form} name="title">
			<Form.Control>
				{#snippet children({ props })}
				<Input {...$constraints.title} {...props} placeholder="Title" required  bind:value={$formData.title} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="description">
			<Form.Control>

				<Input placeholder="Description" required  bind:value={$formData.description} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
<Form.Field {form} name="category">
	<Form.Control>
		<BaseSelect placeholder="Choose category" name="category" bind:value={$formData.category}  options={categories.map(category => { return {value: category.id,label:category.name}})} />
			</Form.Control>
	<Form.FieldErrors />
</Form.Field>
		<Form.Field {form} name="language">
			<Form.Control>
				<BaseSelect placeholder="Choose language" name="language" bind:value={$formData.language}  options={languages.map(language => { return {value: language.code,label:language.name}})} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="provider">
			<Form.Control>
				<BaseSelect placeholder="Choose provider" name="provider"  bind:value={$formData.provider} options={providers.map(provider => { return {value: provider.id.toString(),label:provider.name}})} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="roles">
			<Form.Control>
				<MultipleSelect placeholder="Choose roles" name="roles"  bind:value={$formData.roles} options={roles.map(role => { return {value: role.id.toString(),label:role.name}})} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="resourceFile">
			<Form.Control>

				<Input placeholder="File" type="file" required  bind:files={$file} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Button>Upload</Form.Button>

</form>
