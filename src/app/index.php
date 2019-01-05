<?php
include(__DIR__.'/content/include/initialize.inc.php');
if (checkAuthentication()) header('Location:/app/content/');
else header('Location:/app/login.php/');
