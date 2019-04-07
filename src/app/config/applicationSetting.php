<?php

/* ApplicationName
--------------------------------------------*/
define('APP_NAME', 'STORED RESOURCES 3.x');

/* PHP
--------------------------------------------*/
// DisplayErrorSetting
ini_set('display_errors', 'ON');

/* COOKIE
--------------------------------------------*/
// Cookie expiration date
// define();
// Customize
define('CUSTOM', 4);
// One week in terms of seconds
define('WEEKS', 60*60*24*7);
define('COKIE_LIMIT', CUSTOM * WEEKS);

/* AccelerateConfiguration
--------------------------------------------*/
// Accelerater ON ( $0.04 per GB upload )
define('ALC_ON', 'Enabled');
// Accelerater OFF
define('ALC_OFF', 'Suspended');
// Accelerater Setting
define('ALC_SETTING', ALC_ON);
