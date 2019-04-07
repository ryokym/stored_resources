<?php
/**
* Main
*/
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');

use Common\Common;
use Common\TokenChecker;
use Adapter\S3Adapter;

/* Check Auto login */
$token = [
    'ses'  => (Common::getSession('token'))?? null,
    'path' => ($pathset['token'])?? null,
];
$isAutologin = TokenChecker::isAuthenticatesToken($token['path'], $token['ses']);

if (!$isAutologin) {
    header('Location:/index.php?=signin');
}

$S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
