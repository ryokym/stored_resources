<?php
require_once(dirname(__DIR__).'/include/initialize.php');
require_once(dirname(__DIR__).'/ajax/DTO.ajax.php');

class JsonFormatter extends PostJsonDTO {

    public function __construct() {
        parent::setAction(filter_input(INPUT_POST, 'action'));
        parent::setCurrentDirName(filter_input(INPUT_POST, 'currentDirName'));
        parent::setTargetName(filter_input(INPUT_POST, 'targetName'));
        parent::setCurrentLevel(filter_input(INPUT_POST, 'currentLevel'));
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
        return self::_S3Protcol.self::_bucketName.'/'.$pathName;
    }

    // public function isRootDirectory() {
    //     if (empty(parent::getCurrentDirName())) return true;
    //     else return false;
    // }

}
