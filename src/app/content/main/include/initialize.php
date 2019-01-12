<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');
require_once(__DIR__.'/define.php');
require_once(__DIR__.'/functions.php');
require_once(dirname(__DIR__).'/config/config.php');

if (!checkAuthentication()) header('location:/app/content/login/');

use Aws\S3\S3Client;

$s3 = new S3Client($s3Data);
$s3->registerStreamWrapper();
