<?php
// A method for hashing the name of your S3Bucket
define('ENC_METHOD', 'aes-256-cbc');

// Name of the SESSION to use in this Appliaction
define('SES_KEY', 'storedresources');

// File path of personal information list
define('UD_FILE', DOC_ROOT.'/app/common/auth/userDataList.txt');

// File path of token list used for automatic login authentication
define('TL_FILE', DOC_ROOT.'/app/common/auth/tokenList.txt');

$pathset = [
    'user'  => UD_FILE,
    'token' => TL_FILE,
];
