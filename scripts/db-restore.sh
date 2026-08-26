#!/usr/bin/env bash
set -euo pipefail
if [ -z "${1:-}" ]; then
  echo "Usage: $0 <path-to-backup.gz>"
  exit 1
fi
docker compose exec -T mongo mongorestore --archive --gzip --drop < "$1"
echo "Restored from $1"
