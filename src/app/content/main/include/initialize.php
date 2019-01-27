<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');
require_once(__DIR__.'/functions.php');

if (!checkAuthentication()) header('location:/app/content/login/');

autoloader(AJAX_CLASSES);

use Aws\S3\S3Client;

$s3Object = new S3Client(S3_SET_OPTIONS);
$s3Object->registerStreamWrapper();
