<?php
require_once __DIR__ . '/include/initialize.php';

use Common\Common;
use Adapter\S3Adapter;
use Account\AccountAction;
use Operation\S3StreamAction;
use Operation\OperationHTTPRequest;

$request = new OperationHTTPRequest();

if ($params = filter_input(INPUT_POST, 'requests')) {
    if (filter_input(INPUT_POST, 'isUpload')) {
        $data = json_decode(filter_input(INPUT_POST, 'requestData'), true);

        $request->setProperties($data['requestData']);
        $request->setFilename('file');
    } else {
        $data = json_decode($params, true);
        $data = $data['requestData'];
        if (isset($data['add'])) {
            $added = $data['add'];
            unset($data['add']);
            $data = array_merge($data, $added);
        }
        $request->setProperties($data);
        $S3Client = S3Adapter::getS3Client(S3_SET_OPTIONS);
        $action = new S3StreamAction(
            $request,
            $S3Client,
            Common::getSession('bucket')
        );
        Common::exlog($data);
        try {
            $action->execute($request->getActionType());
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    if ($request->getActionType() === 'logout') {
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
