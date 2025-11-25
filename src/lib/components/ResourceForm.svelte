<script lang="ts">
	import BaseSelect from '$lib/components/composed/BaseSelect.svelte';
	import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { resourceSchema, type ResourceSchema } from '$lib/schemas/resource.schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from './ui/input/input.svelte';
	import MultipleSelect from '$lib/components/composed/MultipleSelect.svelte';
	import * as Form from '$lib/components/ui/form';
	import {
		useFetchCategories,
		useFetchLanguages,
		useFetchProviders,
		useFetchRoles
	} from '$lib/client/queryClient.svelte';

	let { data, action }: { data: SuperValidated<Infer<ResourceSchema>>, action: string } = $props();
	const form = superForm(data, {
		validators: zod4Client(resourceSchema)
	});

	const { form: formData, enhance, message, submitting } = form;
	const file = fileProxy(form, 'resourceFile');

	const categoriesRes = useFetchCategories();
	const languagesReq = useFetchLanguages();
	const providersReq = useFetchProviders();
	const rolesReq = useFetchRoles();

</script>
{#if $message}
	<p class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
		{$message}
	</p>
{/if}
<form action={action} class="space-y-6" enctype="multipart/form-data" method="POST" use:enhance>
	<div class="flex flex-col gap-4">
		<Form.Field {form} name="title">
			<Form.Control>
				<Input bind:value={$formData.title} name="title" placeholder="Title" required />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description">
			<Form.Control>
				<Input bind:value={$formData.description} name="description" placeholder="Description" required />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="category">
			<Form.Control>
				<BaseSelect bind:value={$formData.category} name="category"
										options={categoriesRes.categories.map(category => { return {value: category.id,label:category.name}})}
										placeholder="Choose category" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="language">
			<Form.Control>
				<BaseSelect bind:value={$formData.language} name="language"
										options={languagesReq.languages.map(language => { return {value: language.id,label:language.name}})}
										placeholder="Choose language" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="provider">
			<Form.Control>
				<BaseSelect bind:value={$formData.provider} name="provider"
										options={providersReq.providers.map(provider => { return {value: provider.id.toString(),label:provider.name}})}
										placeholder="Choose provider" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="roles">
			<Form.Control>
				<MultipleSelect bind:value={$formData.roles} name="roles"
												options={rolesReq.roles.map(role => { return {value: role.id.toString(),label:role.name}})}
												placeholder="Choose roles" />
			</Form.Control>
			<Form.FieldErrors />

		</Form.Field>
		<Form.Field {form} name="resourceFile">
			<Form.Control>
				<Input bind:files={$file} name="resourceFile" placeholder="File" required type="file" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Button disabled={$submitting}>Upload</Form.Button>
</form>
