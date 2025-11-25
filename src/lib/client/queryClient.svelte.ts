import type { Category, Language, Provider, Role } from 'prisma-generated/client';

class BaseResponse {
	error = $state();
	isLoading = $state(true);
}

class CategoriesResponse extends BaseResponse {
	categories = $state<Category[]>([]);
}

class LanguagesResponse extends BaseResponse {
	languages = $state<Language[]>([]);
}

class ProvidersResponse extends BaseResponse {
	providers = $state<Provider[]>([]);
}

class RolesResponse extends BaseResponse {
	roles = $state<Role[]>([]);
}

export const useFetchCategories = (): CategoriesResponse => {
	const categoriesResponse = new CategoriesResponse();

	async function fetchCategories() {
		const response = await fetch('/api/categories');
		if (!response.ok) {
			categoriesResponse.error = await response.text();
			categoriesResponse.isLoading = false;
			return;
		}
		categoriesResponse.categories = (await response.json()) as Category[];
		categoriesResponse.isLoading = false;
	}

	fetchCategories();
	return categoriesResponse;
};

export const useFetchLanguages = (): LanguagesResponse => {
	const languagesResponse = new LanguagesResponse();

	async function fetchLanguages() {
		const response = await fetch('/api/languages');
		if (!response.ok) {
			languagesResponse.error = await response.text();
			languagesResponse.isLoading = false;
			return;
		}
		languagesResponse.languages = (await response.json()) as Language[];
		languagesResponse.isLoading = false;
	}

	fetchLanguages();
	return languagesResponse;
};

export const useFetchProviders = (): ProvidersResponse => {
	const providersResponse = new ProvidersResponse();

	async function fetchProviders() {
		const response = await fetch('/api/providers');
		if (!response.ok) {
			providersResponse.error = await response.text();
			providersResponse.isLoading = false;
			return;
		}
		providersResponse.providers = (await response.json()) as Provider[];
		providersResponse.isLoading = false;
	}

	fetchProviders();
	return providersResponse;
};

export const useFetchRoles = (): RolesResponse => {
	const rolesResponse = new RolesResponse();

	async function fetchRoles() {
		const response = await fetch('/api/roles');
		if (!response.ok) {
			rolesResponse.error = await response.text();
			rolesResponse.isLoading = false;
			return;
		}
		rolesResponse.roles = (await response.json()) as Role[];
		rolesResponse.isLoading = false;
	}

	fetchRoles();
	return rolesResponse;
};
