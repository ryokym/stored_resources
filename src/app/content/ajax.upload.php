<?php
require_once(__DIR__.'/include/initialize.inc.php');

$uploadDir = $_POST['dir'];

if (!empty($uploadDir)) $uploadDir.= '/';
$fileName = $_FILES['file']['name'];
$tmpFile = $_FILES['file']['tmp_name'];

try {
    $s3->putObject(array(
        'Bucket' => BUCKET_NAME,
        'Key'    => $uploadDir.$fileName,
        'Body'   => fopen($tmpFile, 'r')
    ));
} catch (S3Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}
