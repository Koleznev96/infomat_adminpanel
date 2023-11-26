#!/usr/bin/env bash
if [[ "$1" == "" ]]; then
    echo "Usage release.sh <RELEASE_VERSION>"
fi
git commit -am "Release v$1"
git tag -a "$1" -m "Release v$1" HEAD
git push
git push --tags
