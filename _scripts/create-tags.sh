#!/usr/bin/env bash
# handle errors gracefully
set -euo pipefail
IFS=$'\n\t'

TAGS=`grep "tag:" < _data/tags.yml | awk '{print $3}'`

printf "Tags:\n-----\n$TAGS\n\n"

for each in $TAGS; do

cat > "publications/vspwp-$each.md" <<EOF
---
title: Publikationen
---

{% include i18n/i18n %}

## VSP Working Papers

{% include filters.html tag="$each" %}

{% include working-papers.html tag="$each" %}
EOF

done
