<?php
namespace Ajax;
use Ajax\JsonDTO;

class Formatter {

    public $jsonDTO;
    public $s3Object;
    private $bucketName;

    const _S3Protcol = S3_PROTOCOL;

    public function __construct($myBucketName, $s3Object, $jsonDTO) {
        $this->myBucketName = $myBucketName;
        $this->s3Object = $s3Object;
        $this->jsonDTO = $jsonDTO;
    }

    public function getPathName() {
        $pathName = $this->jsonDTO->getCurrentDirName().'/'.$this->jsonDTO->getTargetName();
        return $pathName;
    }

    public function getS3pathName() {
        $pathName = $this->getPathName();
        return self::_S3Protcol.$this->bucketName.$pathName;
    }

    public function prependDS(&$str) {
        $str = substr_replace($str, '/', 0, 0);
    }

    public function appendDS(&$str) {
        $len = strlen($str);
        $str = substr_replace($str, '/', $len, 0);
        return $str;
    }

    public function getLines($fName) {
        while (($line = fgets($fName)) !== false) {
            yield $line;
        }
    }
}
