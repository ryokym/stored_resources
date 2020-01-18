<?php
require_once(__DIR__ . '/../initialize.php');

use App\Common\Common;
use App\Adapter\S3Adapter;
use App\Account\AccountAction;
use App\Operation\S3Stream;
use App\Operation\S3StreamAction;
use App\Operation\OperationHTTPRequest;

$request = new OperationHTTPRequest();

if ($params = filter_input(INPUT_POST, 'requests')) {
    $data = json_decode($params, true);
    if (S3Stream::isExistUploadedFile("uploaded")) {
        $request->setFilename('uploaded');
    }
    $request->setProperties($data);
    if ($request->getActionType() === 'logout') {
        Common::exlog($request->getActionType());
        AccountAction::logout();
        exit();
    }
    $S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
    $action = new S3StreamAction(
        $request,
        $S3Client,
        Common::getSession('bucket')
    );
    try {
        $action->execute($request->getActionType());
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

$S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
$action = new S3StreamAction(
    $request,
    $S3Client,
    Common::getSession('bucket')
);
try {
    $action->execute($request->getActionType());
} catch (Exception $e) {
    echo $e->getMessage();
}
