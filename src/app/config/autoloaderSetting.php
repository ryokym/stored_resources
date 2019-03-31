<?php

define('S3_CLASSES', [
    '/app/lib/S3/' => [
        'Filter',
        'Formatter',
        'Action',
        'Request',
    ]
]);

define('ADAPTER_CLASS', [
    '/app/lib/Adapter/' => [
        'S3BucketConnection',
    ]
]);

define('ACCOUNT_CLASSES', [
    '/app/lib/Account/' => [
        'Init',
        'Request',
        'Filter',
        'Action',
        'Crypt',
    ]
]);

define('COMMON_CLASSES', [
    '/app/lib/Common/' => [
        'Common',
        'Constants',
        'Stream',
        'BucketChecker',
        'TokenChecker',
    ]
]);
