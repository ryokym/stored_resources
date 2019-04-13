<?php

/* ApplicationName
--------------------------------------------*/
define('APP_NAME', 'STORED RESOURCES 3.x');

/* PHP
--------------------------------------------*/
// Display Error Setting
ini_set('display_errors', 'ON');

/* S3 Transfer Acceleration Switch
--------------------------------------------*/
// Accelerater ON ( $0.04 per GB upload )
define('ACLR_ON', 'Enabled');
// Accelerater OFF
define('ACLR_OFF', 'Suspended');
// Accelerater Setting
define('ACLR_SETTING', ACLR_ON);

/* Application Status Check
--------------------------------------------*/
// SESSION key for status
define('STATUS', 'status');

/* Maximum number of read lines of file contents
--------------------------------------------*/
define('MAX_READ_LINE', 5000);

/* Maximum number of characters in uploaded file
--------------------------------------------*/
define('MAX_FNAME_LENGTH', 40);
