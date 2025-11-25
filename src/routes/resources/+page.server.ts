import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { resourceSchema } from '$lib/schemas/resource.schema';
import { fail } from '@sveltejs/kit';
import { FileUploader } from '$lib/server/FileUploader';
import { ResourceRepo } from '$lib/server/repos/resource.repo';
import { getMimeTypesFromLabels } from '$lib/helpers/getMimeTypesFromLabel';

export const load = async ({ url }: { url: URL }) => {
	const form = await superValidate(zod4(resourceSchema));
	const type = url.searchParams.get('type') ?? 'all';
	const filteredMimeTypes = getMimeTypesFromLabels(type);
	try {
		const resources = await ResourceRepo.list(
			filteredMimeTypes && {
				OR: filteredMimeTypes.map((prefix) => ({
					fileType: { startsWith: prefix }
				}))
			}
		);
		return { form, resources };
	} catch (error) {
		console.error('Error loading resources:', error);
		return {
			form,
			resources: [],
			error: 'Failed to load resources'
		};
	}
};

export const actions = {
	create: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const resourceFile = formData.get('resourceFile') as File;
		const form = await superValidate(formData, zod4(resourceSchema));
		try {
			if (!form.valid) {
				return fail(400, { message: 'Form validation failed' });
			}

			const ext = resourceFile.name.split('.').pop();
			const key = `uploads/${crypto.randomUUID()}.${ext}`;

			const upload = await FileUploader.send(key, resourceFile, resourceFile.type);

			if (!upload.success) {
				setError(form, 'resourceFile', `File upload failed: ${upload.error}`);
				return;
			}

			await ResourceRepo.create({
				title: form.data.title,
				description: form.data.description,
				fileUrl: upload.data,
				fileType: resourceFile.type,
				category: {
					connect: { id: form.data.category }
				},
				provider: {
					connect: { id: form.data.provider }
				},
				language: {
					connect: { id: form.data.language }
				},
				roles: {
					connect: form.data.roles.map((roleId) => ({ id: roleId }))
				}
			});
		} catch (error) {
			console.error('Resource creation error:', error);
			return setError(form, 'resourceFile', 'An error occurred while creating the resource.');
		}

		return message(form, 'Resource created successfully!');
	}
};
