<?php

//ドキュメントルート
define('DOC_ROOT', $_SERVER["DOCUMENT_ROOT"]);

// 秒換算で1週間
define('WEEKS', 60*60*24*7);

// Error switch
define('ON', 1);
define('OFF', 0);

// Path of UserList
define('USER_LIST', DOC_ROOT.'/app/common/auth/users.list.txt');

// Path of AccountList
define('AUTH_LIST',  DOC_ROOT.'/app/common/auth/authorize.list.txt');
