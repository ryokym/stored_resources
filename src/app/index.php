<?php
include(__DIR__.'/public/STORED_RESOURCES/include/initialize.inc.php');
if (checkAuthentication()) header('Location:/app/public/STORED_RESOURCES/');
else header('Location:/app/login.php/');
