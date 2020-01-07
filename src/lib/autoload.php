<?php
require(__DIR__.'/Autoloader.php');

use App\Autoloader;

$loader = new Autoloader();
$loader->register();
$loader->addNamespace('App', __DIR__.'/');
$loader->addNamespace('App\Common', __DIR__.'/Common');
$loader->addNamespace('App\Common\ApplicationInit', __DIR__.'/Common/ApplicationInit');
$loader->addNamespace('App\Adapter', __DIR__.'/Adapter');
$loader->addNamespace('App\Operation', __DIR__.'/Operation');
$loader->addNamespace('App\Account', __DIR__.'/Account');
