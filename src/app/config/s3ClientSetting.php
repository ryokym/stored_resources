<?php
/**
 * Notice.
 * In general, please operate with ec2.
 * Create a role to give access to s3 and attach that role to ec2.
 * If you do not use ec2, add the access key and secret key to the array value defined below
 * However, please be careful about leakage of such information
 */

/* When operating with docker. Or when not using ec2
 *-----------------------------------------------------*/
define('ACCESS_KEY', 'Access key you got at AWS IAM');
define('SECRET_KEY', 'Secret key you got at AWS IAM');
//S3ClientSetting
define('S3_SET_OPTIONS', [
    'version' => 'latest',
    'region'  => 'ap-northeast-1',
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
//     'region'  => 'ap-northeast-1',
// ]);

// S3 StreamWrapperProtocol
define('S3_PROTOCOL', 's3://');
