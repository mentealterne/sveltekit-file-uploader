export function getMimeTypesFromLabels(label: string): string[] | undefined {
	switch (label) {
		case 'all':
			return undefined;

		case 'videos':
			return ['video/'];

		case 'images':
			return ['image/'];

		case 'documents':
			return [
				'application/pdf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument',
				'text/'
			];

		default:
			return undefined;
	}
}
