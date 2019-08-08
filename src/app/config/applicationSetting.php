<?php

/* ApplicationName
--------------------------------------------*/
define('APP_NAME', 'stored_resources');

/* PHP
--------------------------------------------*/
// Display Error Setting
// either 'ON or OFF'
ini_set('display_errors', 'OFF');

/* S3 Transfer Acceleration Switch
--------------------------------------------*/
// Accelerater ON ( $0.04 per GB upload )
define('ACLR_ON', 'Enabled');
// Accelerater OFF
define('ACLR_OFF', 'Suspended');
// Accelerater Setting
// either ACLR_ON or ACLR_OFF
define('ACLR_SETTING', ACLR_OFF);

/* Application Status Check
--------------------------------------------*/
// SESSION key for status
define('STATUS', 'status');

/* Maximum number of read lines of file contents
--------------------------------------------*/
define('DEFAULT_LINE_LIMIT', 5000);

define('MAX_READ_LINE', DEFAULT_LINE_LIMIT);

/* Maximum number of characters in uploaded file
--------------------------------------------*/
define('DEFAULT_FNAME_LIMIT', 40);

define('MAX_FNAME_LENGTH', DEFAULT_FNAME_LIMIT);
