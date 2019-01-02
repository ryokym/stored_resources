<?php
require_once('define.inc.php');
require_once('config.inc.php');
require_once('functions.inc.php');

if (!checkAuthentication()) header('location:/app/login.php/');
