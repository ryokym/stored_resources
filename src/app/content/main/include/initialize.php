<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

use Common\Common;
use Adapter\S3Adapter;
use S3\Filter;

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
$S3ConnectionData = S3Adapter::getS3AdaptionData(S3_SET_OPTIONS, $bucketname);
$S3ConnectionData['S3Client']->registerStreamWrapper();
