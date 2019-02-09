<?php
namespace S3;

class JsonDTO {
    private $actionType;
    private $currentDirName;
    private $targetName = null;
    private $currentLevel = null;
    private $fileName = null;
    private $tmpFileName = null;
    private $s3Object = null;

    public function getActionType() {
        return $this->actionType;
    }

    public function setActionType($actionType) {
        $this->actionType = $actionType;
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
        return $this->S3Object;
    }

    public function setS3Object($s3obj) {
        $this->S3Object = $s3obj;
    }

    public function setProparties($proparties) {
        foreach ($proparties as $propaty => $param) {
            $this->$propaty = $param;
        }
    }
}
