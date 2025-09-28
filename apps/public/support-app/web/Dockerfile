# FROM apps-base AS base
# Build stage
FROM apps-base AS base

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps ./apps

RUN pnpm install --frozen-lockfile

COPY apps/public/support-app/web ./apps/public/support-app/web

RUN pnpm --filter @v1/support-app build

# Production stage
FROM nginx:alpine AS prod
COPY --from=base /app/apps/public/support-app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
