import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import {
	AWS_REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_ENDPOINT_URL_S3,
	BUCKET_NAME
} from '$env/static/private';
import type { ResponseWithError } from '$lib/types/responseWithError.type';

const client = new S3Client({
	region: AWS_REGION,
	endpoint: AWS_ENDPOINT_URL_S3,
	forcePathStyle: false,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

const bucket = BUCKET_NAME;
const endpoint = AWS_ENDPOINT_URL_S3.replace(/\/$/, '');

const toBody = async (file: File | Blob | Uint8Array): Promise<Uint8Array | Buffer> => {
	if (file instanceof File || file instanceof Blob) {
		return Buffer.from(await file.arrayBuffer());
	}
	return file;
};

export const FileUploader = {
	send: async (
		key: string,
		file: File | Blob | Uint8Array,
		contentType: string
	): Promise<ResponseWithError<string>> => {
		const body = await toBody(file);

		try {
			const result = await client.send(
				new PutObjectCommand({
					Bucket: bucket,
					Key: key,
					Body: body,
					ContentType: contentType
				})
			);

			const code = result.$metadata.httpStatusCode ?? 0;

			if (code >= 200 && code < 300) {
				return {
					success: true,
					data: `${endpoint}/${bucket}/${key}`
				};
			}

			return {
				success: false,
				error: `Upload failed with status ${code}`
			};
		} catch (err: unknown) {
			let message = 'Unknown S3 error';

			if (typeof err === 'object' && err && 'message' in err) {
				message = (err as { message?: string }).message ?? message;
			}

			return {
				success: false,
				error: message
			};
		}
	},

	retrieveFile: async (key: string): Promise<string> => {
		const result = await client.send(
			new GetObjectCommand({
				Bucket: bucket,
				Key: key
			})
		);

		if (!result.Body) throw new Error('File not found');
		const bytes = await result.Body.transformToByteArray();

		const base64 = Buffer.from(bytes).toString('base64');
		return base64;
	}
};
