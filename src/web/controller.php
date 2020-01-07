<?php
require_once(__DIR__ . '/../initialize.php');

use App\Common\Common;
use App\Adapter\S3Adapter;

$token = [
    'ses'  => (Common::getSession('token')) ?? null,
    'path' => (Common::TL_FILE) ?? null,
];

$islogin = $validator->isAuthenticatesToken($token['path'], $token['ses']);
$view = ($islogin) ? "main" : "account";
Common::setSession("login", $islogin);

if (Common::getSession("login")) {
    $S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
    $validator->checkBucket($S3Client, Common::getSession('bucket'), true);
}

include($view . Common::HTML_EXTENSION);
