<?php
// A method for hashing the name of your S3Bucket
define('ENC_METHOD', 'aes-256-cbc');

// Name of the SESSION to use in this Appliaction
define('SES_KEY', 'storedresources');

// File path of personal information list
define('UD_FILE', DOC_ROOT.'/app/common/auth/userDataList.txt');

// File path of token list used for automatic login authentication
define('TL_FILE', DOC_ROOT.'/app/common/auth/tokenList.txt');

$credentialOptions = [
    'SESSION_KEY' => SES_KEY,
    'USER_DATA_FILE_PATH' => UD_FILE,
    'TOKEN_LIST_FILE_PASS' => TL_FILE,
];
