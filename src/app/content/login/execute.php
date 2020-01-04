<?php
require_once(__DIR__ . '/include/initialize.php');

use App\Account\AccountHTTPRequest;
use App\Account\AccountAction;
use App\Common\ApplicationInit\ApplicationDataValidator;

$request = new AccountHTTPRequest();
$validator = new ApplicationDataValidator();

if ($params = filter_input(INPUT_POST, 'requests')) {
    $request->setProperties(json_decode($params, true));
}

try {
    $action = new AccountAction($request, $validator);
    $action->execute($request->getActionType());
} catch (\Exception $e) {
    echo $e->getMessage();
}
