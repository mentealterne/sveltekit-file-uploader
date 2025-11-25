
FROM node:24-alpine AS base
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG ORIGIN
ENV ORIGIN=${ORIGIN}

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

RUN apk add --no-cache openssl

WORKDIR /app


FROM base AS deps

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile


FROM base AS builder

COPY . .

COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts


RUN pnpm run build


FROM base AS runner

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["node", "build"]
