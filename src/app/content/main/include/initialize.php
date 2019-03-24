<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

autoloader(S3_CLASSES);

use Aws\S3\S3Client;
use Common\Common;
use \S3\Filter;

$filter = new Filter();

/* Check Auto login */
$token = [
    'ses'  => (Common::getSession('token'))?? NULL,
    'path' => ($pathset['token'])?? NULL,
];

$isAutologin = $filter->isAuthenticatesToken($token['path'], $token['ses']);

if (!$isAutologin) header('Location:/index.php?=signin');

/* Bucket status check */
$bucketname = Common::getSession('bucket');
$isAvailableBucket = $filter->isAvailableBucket(S3_SET_OPTIONS, $bucketname);

if (!$isAvailableBucket) header('Location:/index.php?=signin');

$S3Client = $filter->getFilteredS3Instance();

$S3Client->registerStreamWrapper();
