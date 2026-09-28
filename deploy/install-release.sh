#!/usr/bin/env bash
# Run on s1 as root: install-release.sh /path/to/static.tar.gz <git-commit>
set -euo pipefail
if [[ $EUID -ne 0 || $# -ne 2 || ! $2 =~ ^[0-9a-f]{40}$ ]]; then
  echo 'Usage (root): install-release.sh <static-archive.tar.gz> <full-git-sha>' >&2
  exit 2
fi
archive=$(realpath "$1")
base=/var/www/portfolio
release="$base/releases/$(date -u +%Y%m%dT%H%M%SZ)-${2:0:12}"
install -d -m 755 "$base/releases"
mkdir -m 755 "$release"
tar --no-same-owner -xzf "$archive" -C "$release"
test -s "$release/index.html"
test -s "$release/404.html"
test -d "$release/_next/static"
for image in seabyte.png parshub.png sopockie-laweczki.webp fox-evolution.webp geo-helper.webp gdynia-2126.webp; do
  test -s "$release/projects/$image"
done
chown -R root:www-data "$release"
find "$release" -type d -exec chmod 755 {} +
find "$release" -type f -exec chmod 644 {} +
printf '%s\n' "$2" > "$release/REVISION"
if [[ -e "$base/current" && ! -L "$base/current" ]]; then
  echo 'Refusing to replace an existing directory at current.' >&2
  exit 1
fi
if [[ -L "$base/current" ]]; then
  ln -sfn "$(readlink "$base/current")" "$base/previous"
fi
ln -s "$release" "$base/current.next"
mv -Tf "$base/current.next" "$base/current"
printf 'Active release: %s\n' "$release"
