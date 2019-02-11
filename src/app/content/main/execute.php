<?php
require_once(__DIR__.'/include/initialize.php');
use S3\RequestDTO;
use S3\Formatter;
use S3\Action;
use Common\Validator;

$RequestDTO = new RequestDTO();

try {
    if (filter_input(INPUT_POST, 'isUpload')) {
        $requestData = json_decode(filter_input(INPUT_POST, 'requestData'), true);
        $RequestDTO->setProparties($requestData['requestData']);
        if ($uploadedFile = Formatter::getFiles('file')) {
            $RequestDTO->setFileName($uploadedFile['name']);
            $RequestDTO->setTmpFileName($uploadedFile['tmp_name']);
        }
    } else {
        $requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
        $RequestDTO->setProparties($requestData);
    }
    $action = new Action($myBucketName, $s3Object, $RequestDTO);
    $action->execute($RequestDTO->getActionType());
} catch(\Exception $e) {
    echo $e->getMessage();
}
