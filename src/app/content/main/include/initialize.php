<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES);

use Common\Common;
use \S3\Init;

$Init = new Init();

/* Check Auto login */
$token = [
    'ses'  => (Common::getSession('token'))?? null,
    'path' => ($pathset['token'])?? null,
];

$isAutologin = $Init->isAuthenticatesToken($token['path'], $token['ses']);

if (!$isAutologin) {
    header('Location:/index.php?=signin');
}


/* Bucket status check */
$bucketname = Common::getSession('bucket');
$isAvailableBucket = $Init->isAvailableBucket(S3_SET_OPTIONS, $bucketname);

if (!$isAvailableBucket) {
    header('Location:/index.php?=signin');
}

$Init->save();

$Init::$S3Client->registerStreamWrapper();
