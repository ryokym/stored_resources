#! /bin/bash

cd /var/www/html/

git fetch origin
git reset --hard origin/master

chmod 666 /var/www/html/src/app/auth/*

wget mysite/app/lib/OpcacheReset.php -q -O

bash path to required.sh

composer install --ignore-platform-reqs --no-scripts

npm install

npm run build
