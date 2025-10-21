#!/usr/bin/env sh
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"

./mvnw clean package "$@"
