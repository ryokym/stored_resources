<?php

define('S3_CLASSES', [
    '/app/lib/S3/' => [
        'Init',
        'Filter',
        'Formatter',
        'Action',
        'Request',
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
