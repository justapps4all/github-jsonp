#!/usr/bin/env bash
git add .
git commit -m "GMT: $(date -u)"
git push --force origin master