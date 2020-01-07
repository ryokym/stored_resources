<?php
session_start();

require_once('config/applicationSetting.php');
require_once('config/credentialSetting.php');
require_once('config/s3ClientSetting.php');
require_once(__DIR__ . '/../vendor/autoload.php');
require_once('lib/autoload.php');

use App\Common\Common;
use App\Common\ApplicationInit\ApplicationDataValidator;

$validator = new ApplicationDataValidator();
try {
    $validator->checkApplicationStatus(Common::STATUS);
} catch (\Exception $e) {
    die($e->getMessage());
}
