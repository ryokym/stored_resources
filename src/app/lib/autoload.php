<?php
require(DOC_ROOT.'/app/lib/Common/Autoloader.php');

use Common\Autoloader;

$loader = new Autoloader();
$loader->register();
$loader->addNamespace('S3', __DIR__.'/S3');
$loader->addNamespace('Account', __DIR__.'/Account');
$loader->addNamespace('Adapter', __DIR__.'/Adapter');
$loader->addNamespace('Common', __DIR__.'/Common');
$loader->addNamespace('Request', __DIR__.'/Request');
