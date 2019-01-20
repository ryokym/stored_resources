<?php
/**
* main
*/

// 除外するファイルパターン
$exclusionPattern = "/\w+.+/";

$ajaxClasses = [
    '/app/lib/' => [
        'JsonDTO',
        'Action',
        'Formatter',
        ]
    ];

//S3ClientSetting
$s3Settings = [
    // 'profile' => 'default',
    'version' => 'latest',
    'region'  => 'ap-northeast-1'
];
