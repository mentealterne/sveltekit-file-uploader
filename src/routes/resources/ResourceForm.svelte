<script lang="ts">
	import BaseSelect from '$lib/components/composed/BaseSelect.svelte';
	import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { resourceSchema, type ResourceSchema } from '$lib/schemas/resource.schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import Input from '../../lib/components/ui/input/input.svelte';
	import MultipleSelect from '$lib/components/composed/MultipleSelect.svelte';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';

	import {
		useFetchCategories,
		useFetchLanguages,
		useFetchProviders,
		useFetchRoles
	} from '$lib/client/queryClient.svelte.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import { formDialogState } from './formDialogState.svelte';

	let { data }: { data: SuperValidated<Infer<ResourceSchema>> } = $props();
	const form = superForm(data, {
		validators: zod4Client(resourceSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				form.reset();
				toast.success('Resource created successfully');
				formDialogState.isOpen = false;
			} else if (result.type === 'failure') {
				toast.error(`Resource creation failed with ${result.status}`);
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
	const file = fileProxy(form, 'resourceFile');

	const categoriesRes = useFetchCategories();
	const languagesReq = useFetchLanguages();
	const providersReq = useFetchProviders();
	const rolesReq = useFetchRoles();


</script>

<form action="?/create" class="space-y-6 flex flex-col " enctype="multipart/form-data" method="POST"
			use:enhance>
	<div class="flex flex-col gap-4 justify-end">
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
	<div class="flex justify-end">
		<Form.Button class={buttonVariants({ variant: "primary" })} disabled={$submitting}>Upload</Form.Button>
	</div>
</form>
