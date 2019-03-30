<?php
require_once(__DIR__.'/include/initialize.php');
use Account\Request;
use Account\Action;

$request = new Request();

$requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);
$request->setProparties($requestData);

try {
    $action = new Action($request, $pathset);
    $action->execute($request->getActionType());
} catch (\Exception $e) {
    echo $e->getMessage();
}
