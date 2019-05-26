<?php
require_once(__DIR__.'/../app/config/applicationSetting.php');
require_once(__DIR__.'/../app/lib/autoload.php');

use Common\Common;

$message = 'opcacheの削除に';
$success = '成功しました';
$fail = '失敗しました';

$status = (opcache_reset())? $success: $fail;

Common::opcacheClearLog($message.$status);
