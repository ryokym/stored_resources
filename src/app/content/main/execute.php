<?php
require_once(__DIR__.'/include/initialize.php');
use S3\JsonDTO;
use S3\Formatter;
use S3\Action;
use Common\Validator;

$jsonDTO = new JsonDTO();

try {
    if (filter_input(INPUT_POST, 'isUpload')) {
        $jsonData = json_decode(filter_input(INPUT_POST, 'jsonData'), true);
        $jsonDTO->setProparties($jsonData['jsonData']);
        if ($uploadedFile = Formatter::getFiles('file')) {
            $jsonDTO->setFileName($uploadedFile['name']);
            $jsonDTO->setTmpFileName($uploadedFile['tmp_name']);
        }
    } else {
        $jsonData = filter_input(INPUT_POST, 'jsonData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
        $jsonDTO->setProparties($jsonData);
    }
    $action = new Action($myBucketName, $s3Object, $jsonDTO);
    $action->execute($jsonDTO->getActionType());
} catch(\Exception $e) {
    $e->getMessage();
}
