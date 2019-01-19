<?php
/**
* main
*/

// 除外するファイルパターン
$exclusionPattern = "/\w+.+/";

$ajaxClasses = [
    '/app/common/lib/' => [
        'Action',
        'Formatter',
        'JsonDTO',
        ]
    ];

//S3ClientSetting
$s3Settings = [
    // 'profile' => 'default',
    'version' => 'latest',
    'region'  => 'ap-northeast-1'
];
