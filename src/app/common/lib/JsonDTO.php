<?php
namespace Ajax;

class JsonDTO {
    private $action;
    private $currentDirName;
    private $targetName = null;
    private $currentLevel = null;
    private $fileName = null;
    private $tmpFileName = null;

    const _S3Protcol = S3_PROTOCOL;
    const _bucketName = BUCKET_NAME;

    public function getAction() {
        return $this->action;
    }

    public function setAction($action) {
        $this->action = $action;
    }

    public function getCurrentDirName() {
        return $this->currentDirName;
    }

    public function setCurrentDirName($currentDirName) {
        $this->currentDirName = $currentDirName;
    }

    public function getTargetName() {
        return $this->targetName;
    }

    public function setTargetName($targetName) {
        $this->targetName = $targetName;
    }

    public function getCurrentLevel() {
        return $this->currentLevel;
    }

    public function setCurrentLevel($currentLevel) {
        $this->currentLevel = $currentLevel;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function getTmpFileName() {
        return $this->tmpFileName;
    }

    public function setTmpFileName($tmpFileName) {
        $this->tmpFileName = $tmpFileName;
    }

    public function getS3Object() {
        global $s3Object;
        return $s3Object;
    }
}
