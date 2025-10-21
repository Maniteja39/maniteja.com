#!/usr/bin/env sh
set -euo pipefail

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables must be set." >&2
  exit 1
fi

JAR_PATH="$(cd "$(dirname "$0")/.." && pwd)/target/maniteja-api-0.0.1-SNAPSHOT.jar"
exec java ${JAVA_OPTS:-} -jar "$JAR_PATH"
