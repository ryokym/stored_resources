<?php
require_once(__DIR__.'/include/initialize.php');
use Account\JsonDTO;
use Account\Action;

$jsonDTO = new JsonDTO();

$jsonData = filter_input(INPUT_POST, 'jsonData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);
$jsonDTO->setProparties($jsonData);

try {
    $action = new Action($jsonDTO, $credentialOptions);
    $action->execute($jsonDTO->getActionType());
} catch(\Exception $e) {
    echo $e->getMessage();
}
