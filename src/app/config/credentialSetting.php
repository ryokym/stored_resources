<?php
// A method for hashing the name of your S3Bucket
// One of the return values ​​of the PHP Builtin "openssl_get_cipher_methods()"
define('ENC_METHOD', 'AES-256-CFB');

// Name of the SESSION to use in this Appliaction
define('SES_KEY', 'your_session_key');

// File path of personal information list
define('UD_FILE', __DIR__.'/../auth/users.txt');

// File path of token list used for automatic login authentication
define('TL_FILE', __DIR__.'/../auth/tokens.txt');
