<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES);

use Aws\S3\S3Client;
use S3\Init;

$token = [
    'ses'  => (\Common::getSession('token'))?? NULL,
    'path' => ($pathset['token'])?? NULL,
];

$stream = new \Stream($token['path']);
if (!Account\Filter::lookupToken($stream, $token['ses'])) header('Location:/index.php?=signin');

$s3Object = Init::getS3Object(S3_SET_OPTIONS);

try {
    $bucketname = \Common::getSession('bucket')?? NULL;
    Init::checkAvailableBucket($s3Object, $bucketname);
} catch(Exception $e) {
    // echo $e->getMessage();
    // die;
    header('Location/index.php?=signin');
    // TODO sessionに例外メッセージを格納してログイン画面へリダイレクト。バケット名を変更するよう促すポップアップ表示
}

$s3Object->registerStreamWrapper();
