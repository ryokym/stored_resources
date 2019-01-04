<?php
include(__DIR__.'/public/STORED_RESOUCES/include/initialize.inc.php');
if (checkAuthentication()) header('Location:/app/public/STORED_RESOUCES/');
else header('Location:/app/login.php/');
