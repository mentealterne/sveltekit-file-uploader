import { z } from 'zod';

const fileSizeLimit = 5 * 1024 * 1024;
const allowedFileTypes = [
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'video/mp4',
	'video/mpeg',
	'image/jpeg',
	'image/png',
	'image/gif',
	'text/plain',
	'application/vnd.ms-powerpoint',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];

export const resourceSchema = z.object({
	title: z
		.string()
		.min(1, { error: 'Title must be at least 1 character' })
		.max(200, { error: 'Title must be at most 200 characters' }),
	description: z.string({ error: 'Description must be between 1 and 1000 chars' }).min(1).max(1000),
	category: z.string({ error: 'Category is required' }).min(1, { error: 'Category is required' }),
	language: z.string({ error: 'Language is required' }).min(1, { error: 'Language is required' }),
	provider: z.string({ error: 'Provider is required' }).min(1, { error: 'Provider is required' }),
	roles: z.array(z.string()).min(1, { error: 'Select at least one role' }),
	resourceFile: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: 'A file is required' })
		.refine((file) => file.size <= fileSizeLimit, {
			message: `File size must be less than ${fileSizeLimit / (1024 * 1024)} MB`
		})
		.refine((file) => allowedFileTypes.includes(file.type), {
			message: 'File type is not supported'
		})
});

export type ResourceSchema = typeof resourceSchema;
