<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/include/initialize.inc.php');

use Common\Common;
use Adapter\S3Adapter;

/* Check Auto login */
$token = [
    'ses'  => (Common::getSession('token'))?? null,
    'path' => (Common::TL_FILE)?? null,
];
$isAutologin = $validator->isAuthenticatesToken($token['path'], $token['ses']);

if (!$isAutologin) {
    header('Location:/index.php?signin');
}

$S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
$validator->checkBucket($S3Client, Common::getSession('bucket'), true);
