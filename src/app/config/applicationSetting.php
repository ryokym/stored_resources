<?php

// ApplicationName
define('APP_NAME', 'STORED RESOURCES 3.x');

/**
* PHP
*/
// DisplayErrorSetting
ini_set('display_errors', 'ON');

/**
* COOKIE
*/
// Cookie expiration date
// Customize
define('CUSTOM', 4);
// One week in terms of seconds
define('WEEKS', 60*60*24*7);
define('COKIE_LIMIT', CUSTOM * WEEKS);
ini_set( 'session.gc_maxlifetime', COKIE_LIMIT );
