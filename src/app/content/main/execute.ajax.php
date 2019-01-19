<?php
require_once(dirname(__DIR__).'/main/include/initialize.php');
use Ajax\Action;

$actionType = filter_input(INPUT_POST, 'action');
$actionClass = new Action();
$actionClass->execute($actionType);
