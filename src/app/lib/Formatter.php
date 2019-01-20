<?php
namespace Ajax;
use Ajax\JsonDTO;

class Formatter extends JsonDTO {

    public function __construct() {
        parent::setAction(filter_input(INPUT_POST, 'action'));
        parent::setCurrentDirName(filter_input(INPUT_POST, 'currentDirName'));
        parent::setTargetName(filter_input(INPUT_POST, 'targetName'));
        // parent::setCurrentLevel(filter_input(INPUT_POST, 'currentLevel'));
        parent::setFileName($_FILES['file']['name']);
        parent::setTmpFileName($_FILES['file']['tmp_name']);

        // if ($this->isRootDirectory()) self::$isRootDirectory = true;
        // else self::$isRootDirectory = false;
    }

    public function getPathName() {
        $pathName = parent::getCurrentDirName().'/'.parent::getTargetName();
        return $pathName;
    }

    public function getS3pathName() {
        $pathName = $this->getPathName();
        return self::_S3Protcol.self::_bucketName.$pathName;
    }

    // public function isRootDirectory() {
    //     if (empty(parent::getCurrentDirName())) return true;
    //     else return false;
    // }
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
