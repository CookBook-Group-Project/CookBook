#!/usr/bin/env bash
set -euo pipefail
mkdir -p backups
timestamp=$(date +%Y%m%d-%H%M%S)
docker compose exec -T mongo mongodump --archive --gzip --db=CookBook > "backups/cookbook-${timestamp}.gz"
echo "Backup written to backups/cookbook-${timestamp}.gz"
