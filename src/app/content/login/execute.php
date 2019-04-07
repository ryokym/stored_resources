<?php
require_once(__DIR__.'/include/initialize.php');
use Account\AccountRequest;
use Account\AccountAction;
use Common\ApplicationInit\ApplicationDataValidator;

$request = new AccountRequest();
$validator = new ApplicationDataValidator();

$requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$request->setProparties($requestData);

try {
    $action = new AccountAction($request, $validator);
    $action->execute($request->getActionType());
} catch (\Exception $e) {
    echo $e->getMessage();
}
