<?php
require_once(__DIR__.'/include/initialize.inc.php');

$name = $_POST['name'];
$path = $_POST['path'];
$results = array();
$dropedPathName = $path.$name;;
$list = array();

$results = $s3->listObjects([
    'Bucket' => BUCKET_NAME,
    'Prefix' => $dropedPathName
]);

foreach ($results['Contents'] as $result) {
    $s3->deleteObject([
        'Bucket' => BUCKET_NAME,
        'Key' => $result['Key']
    ]);
}

// rmdir(S3_PROTOCOL.BUCKET_NAME.'/'.$dropedPathName);
// } else {
//     unlink(S3_PROTOCOL.BUCKET_NAME.'/'.$dropedPathName);
// }
