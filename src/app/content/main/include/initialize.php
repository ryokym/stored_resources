<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES, ACCOUNT_CLASSES);

if (!Account\Filter::isAllowAutoLogin($credentialOptions['TOKEN_LIST_FILE_PASS'], $_SESSION['token'])) {
    header('Location:/app/content/login/');
}

use Aws\S3\S3Client;

$s3Object = new S3Client(S3_SET_OPTIONS);

if (!$s3Object->doesBucketExist($myBucketName)) {
    echo "Please <a href=''>re-register</a> your account with a valid bucket";
    session_destroy();
    die;
}

$s3Object->registerStreamWrapper();
