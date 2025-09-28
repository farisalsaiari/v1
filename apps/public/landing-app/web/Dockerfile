# FROM apps-base AS base
# Build stage
FROM apps-base AS base

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps ./apps

RUN pnpm install --frozen-lockfile

COPY apps/public/landing-app/web ./apps/public/landing-app/web

RUN pnpm --filter @v1/landing-app build

# Production stage
FROM nginx:alpine AS prod
COPY --from=base /app/apps/public/landing-app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
