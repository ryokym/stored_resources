<?php
require_once('define.inc.php');
require_once('config.inc.php');
require_once('functions.inc.php');
require_once(DOC_ROOT.'/vendor/autoload.php');
use Aws\S3\S3Client;
if (!checkAuthentication()) header('location:/app/login.php/');


$s3 = new S3Client($s3Data);
$s3->registerStreamWrapper();
