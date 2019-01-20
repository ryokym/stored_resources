<?php
require_once(__DIR__.'/include/initialize.php');
use Ajax\Action;

$actionType = filter_input(INPUT_POST, 'action');
$actionClass = new Action();
$s3 = $actionClass->setS3Object($s3Object);
$actionClass->execute($actionType);
