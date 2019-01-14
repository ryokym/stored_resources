<?php
require_once(dirname(__DIR__).'/include/initialize.php');
require_once(dirname(__DIR__).'/ajax/DTO.ajax.php');
require_once(dirname(__DIR__).'/ajax/action.ajax.php');


$actionType = filter_input(INPUT_POST, 'action');
$actionClass = new AjaxAction();
$actionClass->execute($actionType);

// $name = $_POST['targetName'];
// $dir = $_POST['currentDirName'];
// $level = $_POST['currentLevel'];
