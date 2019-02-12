<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES, ACCOUNT_CLASSES);

$SESToken = ($_SESSION['token'])?? NULL;
$tokenList = ($credentialOptions['TOKEN_LIST_FILE_PASS'])?? NULL;
try {
    if (!Account\Filter::isAllowAutoLogin($tokenList, $SESToken)) {
        header('Location:/app/content/login/');
    }
} catch(\Exception $e) {
    die($e->getMessage());
}

use Aws\S3\S3Client;

try {
    $s3Object = new S3Client(S3_SET_OPTIONS);
} catch(\InvalidArgumentException $e) {
    die($e->getMessage());
}

if (!$s3Object->doesBucketExist($myBucketName)) {
    echo "Please <a href=''>re-register</a> your account with a valid bucket";
    session_destroy();
    die;
}

$s3Object->registerStreamWrapper();
