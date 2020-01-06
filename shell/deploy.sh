#! /bin/bash

cd /var/www/html/

git fetch origin
git reset --hard origin/master

wget mysite/app/lib/OpcacheReset.php -q -O

bash path to required.sh

composer install --ignore-platform-reqs --no-scripts

npm ci

npm run build
