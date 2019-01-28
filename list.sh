#!/bin/sh

set -e

for p in patterns/*.png; do
  echo $p | sed 's/patterns\/\(.*\)/"\1",/';
done
