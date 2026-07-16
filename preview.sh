#!/usr/bin/env bash
#
# preview.sh — spin up a local preview of the PolyKybd docs.
#
#   ./preview.sh            # live-reloading dev server (default)
#   ./preview.sh build      # build + serve the real production output
#   ./preview.sh --port 8080 [build]
#   ./preview.sh --reinstall # force a clean dependency reinstall first
#
# Needs Node.js 20+ and npm on PATH. Installs dependencies automatically the
# first time (or when package-lock.json changes). Ctrl-C to stop.

set -euo pipefail

# Always run from the repo root (the dir this script lives in), whatever the cwd.
cd "$(dirname "$(readlink -f "$0")")"

MODE="dev"
PORT="4321"
REINSTALL=0

while [ $# -gt 0 ]; do
  case "$1" in
    dev|build|preview) MODE="$1" ;;
    --port) shift; PORT="${1:?--port needs a value}" ;;
    --reinstall) REINSTALL=1 ;;
    -h|--help)
      sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "preview.sh: unknown argument '$1'" >&2; exit 2 ;;
  esac
  shift
done
# "preview" is an alias for "build" (build once, then serve it).
[ "$MODE" = "preview" ] && MODE="build"

command -v npm >/dev/null 2>&1 || { echo "preview.sh: npm not found — install Node.js 20+ first." >&2; exit 1; }

# Install deps when missing, when the lockfile is newer than the install, or on
# explicit --reinstall. Uses `npm ci` for a clean, lockfile-exact tree.
need_install=0
if [ "$REINSTALL" = 1 ]; then
  need_install=1
elif [ ! -d node_modules ]; then
  need_install=1
elif [ package-lock.json -nt node_modules ]; then
  need_install=1
fi
if [ "$need_install" = 1 ]; then
  echo "==> Installing dependencies (npm ci)…"
  npm ci
fi

if [ "$MODE" = "build" ]; then
  echo "==> Building the production site…"
  npm run build
  echo "==> Serving the production build at http://localhost:${PORT}/ (Ctrl-C to stop)"
  exec npm run preview -- --port "$PORT" --host
else
  echo "==> Starting the dev server at http://localhost:${PORT}/ (Ctrl-C to stop)"
  exec npm run dev -- --port "$PORT" --host
fi
