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
// One week in terms of seconds
define('WEEKS', 60*60*24*7);
// Customize
define('CUSTOM', 8);
define('COKIE_LIMIT', CUSTOM * WEEKS);

// session_set_cookie_params(COKIE_LIMIT);
