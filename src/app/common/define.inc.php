<?php

//アプリケーション名称
define('APP_NAME', 'STORED RESOURCES 2.x');

//ドキュメントルート
define('DOC_ROOT', $_SERVER["DOCUMENT_ROOT"]);

// 秒換算で1週間
define('WEEKS', 60*60*24*7);

// UserList
define('USER_LIST', __DIR__.'/auth/users.list.txt');

// AccountListFile
define('AUTH_LIST', __DIR__.'/auth/authorize.list.txt');

// Error switch
define('ON', 1);
define('OFF', 0);
