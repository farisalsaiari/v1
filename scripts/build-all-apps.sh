#!/bin/bash

set -e

echo "🚧 Building all frontend Docker images..."

apps=(
  "apps/client/merchant-app/web"
  "apps/client/kitchen-display/web"
  "apps/admin/console/web"
)

for app in "${apps[@]}"; do
  app_name=$(basename $(dirname "$app"))-$(basename "$app") # e.g., merchant-app-web
  echo "📦 Building $app_name from $app"
  docker build -t pos-frontend-$app_name "$app"
done

echo "✅ All frontend apps built successfully."
