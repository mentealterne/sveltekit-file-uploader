# pack-file-uploader

A file uploader web app built with SvelteKit, Prisma, and Amazon S3-compatible storage.

This repository contains a small SvelteKit application that allows uploading, storing, and viewing files with metadata
persisted via Prisma (Postgres/SQLite) and file contents stored in S3.

Key technologies

- SvelteKit (frontend + server routes)
- Prisma (ORM for database migrations and models)
- S3-compatible object storage (Amazon S3, MinIO, or similar)
- Docker Compose (optional: runs the app and dependent services)

Quick start

1) Environment

- Copy `.env.example` to `.env` and fill in the values for your environment (database URL, S3 credentials, etc.).

  ```sh
  cp .env.example .env
  ```

  Then edit `.env` and provide:
    - DATABASE_URL (e.g. a Postgres connection string or SQLite file path)
    - S3_ENDPOINT (or AWS_REGION / AWS_S3_HOST if using AWS)
    - S3_BUCKET
    - AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (or MinIO equivalents)
    - Any other variables present in `.env.example`

2) Option A — Run with Docker Compose (recommended for easy setup)

This project includes a `docker-compose.yml` that can start the app and common dependencies (database, MinIO, etc.).

- Build and start services:

  ```sh
  docker-compose up --build
  ```

- Stop and remove containers:

  ```sh
  docker-compose down
  ```

Notes:

- Check the compose file to see which ports are exposed. The SvelteKit dev server or production container will provide
  the web UI.
- Use `docker-compose logs -f` to follow logs for troubleshooting.

3) Option B — Run locally (without Docker)

Install dependencies and run database migrations and code generation locally using pnpm:

  ```sh
  pnpm i
  pnpx prisma migrate dev
  pnpx prisma generate
  pnpm run dev -- --open
  ```

- `pnpm i` installs dependencies.
- `pnpx prisma migrate dev` runs Prisma migrations and creates the database schema.
- `pnpx prisma generate` generates the Prisma client.
- `pnpm run dev -- --open` starts the dev server and opens the app in your browser.

Development notes

- Database schema and migrations live in `prisma/`.
- Prisma client is used from `src/generated/prisma/client.ts` .
- Server-side upload handling is implemented using SvelteKit server routes and a `FileUploader` helper in
  `src/lib/server/FileUploader.ts`.
- Allowed MIME types and client helpers live in `src/lib/helpers`.

Environment / Deployment tips

- For production, set NODE_ENV=production and run a production build (e.g., `pnpm build` and then the appropriate
  adapter start command).
- Ensure your S3 credentials and bucket policies allow PutObject/GetObject for the app's IAM user or access keys.
- Use a managed database (Postgres) or a persistent volume for local Postgres when running with Docker Compose.

Troubleshooting

- Missing `.env` or wrong values: the app will fail to connect to the database or S3. Double-check `.env` and the logs.
- Prisma errors after changing schema: run `pnpx prisma migrate dev` again and `pnpx prisma generate`.
- If uploads fail with permission errors, verify the S3 credentials, bucket name, and endpoint.

---


