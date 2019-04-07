<?php
require_once(__DIR__.'/include/initialize.php');
use Account\AccountRequest;
use Account\AccountAction;

$request = new AccountRequest();

$requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$request->setProparties($requestData);

try {
    $action = new AccountAction($request, $pathset);
    $action->execute($request->getActionType());
} catch (\Exception $e) {
    echo $e->getMessage();
}
