<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES);

use Aws\S3\S3Client;
use S3\Init;

$SESToken = ($_SESSION['token'])?? NULL;
$tokenList = ($credentialOptions['TOKEN_LIST_FILE_PASS'])?? NULL;

if (!Account\Filter::isAllowAutoLogin($tokenList, $SESToken)) {
    header('Location:/index.php?=signin');
}

$s3Object = Init::getS3Object(S3_SET_OPTIONS);

try {
    Init::checkAvailableBucket($s3Object, $myBucketName);
} catch(Exception $e) {
    // echo $e->getMessage();
    // die;
    header('Location/index.php?=signin');
    // TODO sessionに例外メッセージを格納してログイン画面へリダイレクト。バケット名を変更するよう促すポップアップ表示
}

$s3Object->registerStreamWrapper();
