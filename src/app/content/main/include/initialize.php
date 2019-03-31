<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES, ADAPTER_CLASS);

use Common\Common;
use Adapter\S3BucketConnection;
use \S3\Filter;

/* Check Auto login */
$token = [
    'ses'  => (Common::getSession('token'))?? null,
    'path' => ($pathset['token'])?? null,
];

$isAutologin = Filter::isAuthenticatesToken($token['path'], $token['ses']);

if (!$isAutologin) {
    header('Location:/index.php?=signin');
}


/* Bucket status check */
$bucketname = Common::getSession('bucket');
// $isAvailableBucket = $Init->isAvailableBucket(S3_SET_OPTIONS, $bucketname);
//
// if (!$isAvailableBucket) {
//     header('Location:/index.php?=signin');
// }
//
// $Init->save();
$S3ConnectionData = S3BucketConnection::getS3ConnectionData(S3_SET_OPTIONS, $bucketname);
$S3ConnectionData['S3Client']->registerStreamWrapper();
