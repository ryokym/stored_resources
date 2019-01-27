<?php
require_once(__DIR__.'/include/initialize.php');
use Ajax\JsonDTO;
use Ajax\S3Action;

$jsonData = filter_input(INPUT_POST, 'jsonData', FILTER_DEFAULT,FILTER_REQUIRE_ARRAY);

$jsonDTO = new JsonDTO();
$jsonDTO->setProparties($jsonData);

$S3Action = new S3Action($myBucketName, $s3Object, $jsonDTO);
$S3Action->execute($jsonDTO->getAction());
