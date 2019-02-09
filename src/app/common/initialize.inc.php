<?php
session_start();
require_once(__DIR__.'/define.inc.php');
require_once(DOC_ROOT.'/vendor/autoload.php');
require_once(DOC_ROOT.'/app/config/credentialSetting.php');
require_once(DOC_ROOT.'/app/config/applicationSetting.php');
require_once(DOC_ROOT.'/app/config/autoloaderSetting.php');
require_once(DOC_ROOT.'/app/config/s3ClientSetting.php');
require_once(__DIR__.'/functions.inc.php');

$myBucketName = $_SESSION['bucket']?? NULL;

autoloader(COMMON_CLASSES);
