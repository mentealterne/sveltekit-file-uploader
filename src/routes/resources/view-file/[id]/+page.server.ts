import { ResourceRepo } from '$lib/server/repos/resource.repo';
import { FileUploader } from '$lib/server/FileUploader';
import { fail } from '@sveltejs/kit';

export async function load({ params }: { params: { id: string } }) {
	const { id } = params;

	const resource = await ResourceRepo.getById(id);
	if (!resource) {
		return fail(404, { error: 'Resource not found' });
	}

	const key = resource.fileUrl.split('/').slice(-2).join('/');

	try {
		const resourceFile = await FileUploader.retrieveFile(key);
		return {
			resource,
			base64: resourceFile,
			mimeType: resource.fileType ?? 'application/octet-stream'
		};
	} catch (error) {
		console.error(error);
		return fail(500, { error: 'Failed to load file' });
	}
}
