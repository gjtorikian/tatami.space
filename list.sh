#!/bin/sh

set -e

for p in patterns/*.png; do
  echo $p | cut -f 1 -d '.' | sed 's/patterns\/\(.*\)/"\1",/';
done
