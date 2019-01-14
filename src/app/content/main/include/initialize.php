<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');
require_once(__DIR__.'/define.php');
require_once(__DIR__.'/functions.php');
require_once(dirname(__DIR__).'/config/config.php');

if (!checkAuthentication()) header('location:/app/content/login/');

use Aws\S3\S3Client;

$s3Object = new S3Client($s3Data);
$s3Object->registerStreamWrapper();
