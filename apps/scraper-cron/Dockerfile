FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/scraper/package.json ./packages/scraper/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN npm ci --include-workspace-root --ignore-scripts

COPY packages/scraper/src/ ./packages/scraper/src/
COPY packages/scraper/tsconfig.json ./packages/scraper/tsconfig.json
COPY apps/scraper-cron/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

CMD ["sh", "./entrypoint.sh"]
