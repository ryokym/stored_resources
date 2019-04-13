<?php
require(__DIR__.'/Common/Autoloader.php');

use Common\Autoloader;

$loader = new Autoloader();
$loader->register();
$loader->addNamespace('Common', __DIR__.'/Common');
$loader->addNamespace('Common\ApplicationInit', __DIR__.'/Common/ApplicationInit');
$loader->addNamespace('Adapter', __DIR__.'/Adapter');
$loader->addNamespace('Operation', __DIR__.'/Operation');
$loader->addNamespace('Account', __DIR__.'/Account');
