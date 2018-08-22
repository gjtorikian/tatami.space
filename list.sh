#!/bin/sh

set -e

for p in patterns/*.png; do
  echo $p | sed 's/\(.*\)/"\1",/';
done
