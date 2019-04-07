<?php
/**
* Common
*/
session_start();
require_once(__DIR__.'/define.inc.php');
require_once(DOC_ROOT.'/vendor/autoload.php');
require_once(DOC_ROOT.'/app/config/credentialSetting.php');
require_once(DOC_ROOT.'/app/config/applicationSetting.php');
require_once(DOC_ROOT.'/app/config/s3ClientSetting.php');
require_once(DOC_ROOT.'/app/lib/autoload.php');

use Common\Common;
use Common\ApplicationInit\ApplicationDataValidator;

$validator = new ApplicationDataValidator();

try {
    $validator->checkApplicationStatus(Common::STATUS);
} catch(\Exception $e) {
    die($e->getMessage());
}
