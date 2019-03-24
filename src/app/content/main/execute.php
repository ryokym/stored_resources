<?php
require_once(__DIR__.'/include/initialize.php');
use S3\Request;
use S3\Formatter;
use S3\Action;

$request = new Request();

try {
    if (filter_input(INPUT_POST, 'isUpload')) {
        $requestData = json_decode(filter_input(INPUT_POST, 'requestData'), true);
        $RequestDTO->setProparties($requestData['requestData']);
        if ($uploadedFile = Formatter::getFiles('file')) {
            $request->setFileName($uploadedFile['name']);
            $request->setTmpFileName($uploadedFile['tmp_name']);
        }
    } else {
        $requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
        $request->setProparties($requestData);
    }

    if ($request->getActionType() === 'logout') Action::logout();

    $action = new Action($bucketname, $S3Client, $request);
    $action->execute($request->getActionType());
} catch(\Exception $e) {
    echo $e->getMessage();
}
