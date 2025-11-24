import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { resourceSchema } from '$lib/schemas/resource.schema';

export const load = async () => {
	const form = await superValidate(zod4(resourceSchema))
	return { form }
}
