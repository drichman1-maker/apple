FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copy workspace manifests + prisma schema (needed for postinstall generate)
COPY package.json package-lock.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/db/prisma/ ./packages/db/prisma/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY apps/api/package.json ./apps/api/

# Install all workspace deps (postinstall runs prisma generate)
RUN DATABASE_URL="postgresql://x:x@localhost/x" npm ci --include-workspace-root

# Copy remaining source
COPY packages/db/src/ ./packages/db/src/
COPY packages/types/ ./packages/types/
COPY apps/api/ ./apps/api/

EXPOSE 3001

CMD ["npx", "tsx", "apps/api/src/index.ts"]
