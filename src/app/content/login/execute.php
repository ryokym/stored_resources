<?php
require_once(__DIR__.'/include/initialize.php');
use Account\AccountHTTPRequest;
use Account\AccountAction;
use Common\ApplicationInit\ApplicationDataValidator;

$request = new AccountHTTPRequest();
$validator = new ApplicationDataValidator();

$requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$request->setProparties($requestData);

try {
    $action = new AccountAction($request, $validator);
    $action->execute($request->getActionType());
} catch (\Exception $e) {
    echo $e->getMessage();
}
