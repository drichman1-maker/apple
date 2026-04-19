FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copy workspace manifests
COPY package.json package-lock.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/types/package.json ./packages/types/
COPY apps/api/package.json ./apps/api/

# Install all workspace deps
RUN npm ci --include-workspace-root

# Copy source
COPY packages/db/ ./packages/db/
COPY packages/types/ ./packages/types/
COPY apps/api/ ./apps/api/

# Generate Prisma client (DATABASE_URL needed for schema validation during generate)
RUN cd packages/db && DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" npx prisma generate

EXPOSE 3001

CMD ["npx", "tsx", "apps/api/src/index.ts"]
