<?php
/**
 * Notice.
 * In general, please operate with ec2.
 * Create a role to give access to s3 and attach that role to ec2.
 * If you do not use ec2, add the access key and secret key to the array value defined below
 * However, please be careful about leakage of such information
 */

define('REGION', 'your_region');

/* When operating with docker. Or when not using ec2
 *-----------------------------------------------------*/
define('ACCESS_KEY', 'your_access_key');
define('SECRET_KEY', 'your_secret_key');
//S3ClientSetting
define('S3_SET_OPTIONS', [
    'version' => 'latest',
    'region'  => REGION,
    'credentials' => [
        'key' => ACCESS_KEY,
        'secret' => SECRET_KEY,
    ]
]);

/* When operating with ec2
 *-----------------------------------------------------*/
//S3ClientSetting
// define('S3_SET_OPTIONS', [
//     'version' => 'latest',
//     'region'  => REGION,
// ]);

// S3 StreamWrapperProtocol
define('S3_PROTOCOL', 's3://');
