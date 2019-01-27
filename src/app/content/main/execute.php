<?php
require_once(__DIR__.'/include/initialize.php');
use Ajax\JsonDTO;
use Ajax\S3Action;

$jsonDTO = new JsonDTO();

if (filter_input(INPUT_POST, 'isUpload')) {
    $jsonData = json_decode(filter_input(INPUT_POST, 'jsonData'), true);
    $jsonDTO->setProparties($jsonData['jsonData']);
    if ($uploadedFile = getFilesData('file')) {
        $jsonDTO->setFileName($uploadedFile['name']);
        $jsonDTO->setTmpFileName($uploadedFile['tmp_name']);
    }
} else {
    $jsonData = filter_input(INPUT_POST, 'jsonData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
    $jsonDTO->setProparties($jsonData);
}
$S3Action = new S3Action($myBucketName, $s3Object, $jsonDTO);
$S3Action->execute($jsonDTO->getActionType());
