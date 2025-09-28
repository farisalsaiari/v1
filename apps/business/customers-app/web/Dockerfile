# FROM apps-base AS base
# Build stage
FROM apps-base AS base

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps ./apps

RUN pnpm install --frozen-lockfile

COPY apps/business/customers-app/web ./apps/business/customers-app/web

RUN pnpm --filter @v1/admin-console build

# Production stage
FROM nginx:alpine AS prod
COPY --from=base /app/apps/business/customers-app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
