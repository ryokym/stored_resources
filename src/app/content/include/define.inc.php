<?php

//アプリケーション名称
define('APP_NAME','STORED_RESOURCES');

//ドキュメントルート
define('DOC_ROOT', $_SERVER["DOCUMENT_ROOT"]);

// 秒換算で1週間
define('WEEKS', 60*60*24*7);

// UserList
define('USER_LIST', __DIR__.'/userlist.inc.txt');

// AccountListFile
define('AUTH_LIST', __DIR__.'/authorize.inc.txt');

// LoginPassword
define('PW', 'h0933MUfYHnG2NL');

// CookieUserName
define('USERNAME', 'storedresources_username');

// CookieAuthValue
define('AUTH_VALUE', 'storedresources_auth_value');

// S3 StreamWrapperProtocol
define('S3_PROTOCOL', 's3://');

// S3 BucketName in resources
define('BUCKET_NAME', 'storedresources.site');
