<?php
/**
* Common
*/
session_start();
require_once(__DIR__.'/../config/applicationSetting.php');
require_once(__DIR__.'/../config/credentialSetting.php');
require_once(__DIR__.'/../config/s3ClientSetting.php');
require_once(__DIR__.'/../../../vendor/autoload.php');
require_once(__DIR__.'/../lib/autoload.php');

use Common\Common;
use Common\ApplicationInit\ApplicationDataValidator;

$validator = new ApplicationDataValidator();

try {
    $validator->checkApplicationStatus(Common::STATUS);
} catch (\Exception $e) {
    die($e->getMessage());
}
