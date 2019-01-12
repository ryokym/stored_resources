<?php
require_once(dirname(__DIR__).'/include/initialize.php');

$newDirName = $_POST['newDirName'];
$currentDirName = $_POST['currentDirName'];
// streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
// mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
$s3->putObject([
    'Bucket' => BUCKET_NAME,
    // 最後に/付けないとファイルになる
    'Key'    => $currentDirName.$newDirName.'/',
]);
