<?php
require_once(dirname(__DIR__).'/include/initialize.php');
require_once(dirname(__DIR__).'/ajax/action.ajax.php');


$actionType = filter_input(INPUT_POST, 'action');
$actionClass = new AjaxAction();
$actionClass->execute($actionType);
