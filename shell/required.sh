#! /bin/bash

# You need to execute "git config core.sparsecheckout true" after git init
{
  echo "/src"
  echo "composer.json"
  echo "composer.lock"
  echo "package-lock.json"
  echo "package.json"
  echo "webpack.config.js"
  echo "postcss.config.js"
} > .git/info/sparse-checkout
git read-tree -m -u HEAD
