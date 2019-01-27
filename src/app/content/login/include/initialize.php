<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/app/common/initialize.inc.php');
require_once(__DIR__.'/functions.php');

$logout = filter_input(INPUT_GET, 'logout');
if (isset($logout)) actionLogout();

$userName = filter_input(INPUT_POST, 'userName');
$password = filter_input(INPUT_POST, 'password');

if (getAuthThenSetCookies($userName, $password)) header('Location:/app/content/main/');
