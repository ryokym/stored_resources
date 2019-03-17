<?php
require_once(__DIR__.'/include/initialize.php');
use Account\RequestDTO;
use Account\Action;

$RequestDTO = new RequestDTO();

$requestData = filter_input(INPUT_POST, 'requestData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
$RequestDTO->setProparties($requestData);

try {
    $action = new Action($RequestDTO, $pathset);
    $action->execute($RequestDTO->getActionType());
} catch(\Exception $e) {
    echo $e->getMessage();
}
