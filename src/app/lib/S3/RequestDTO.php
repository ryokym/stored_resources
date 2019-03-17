<?php
namespace S3;

class RequestDTO {
    private $actionType;
    private $dirname     = null;
    private $name        = null;
    private $level       = null;
    private $fileName    = null;
    private $tmpFileName = null;
    private $s3Object    = null;

    public function getActionType() {
        return $this->actionType;
    }

    public function setActionType($actionType) {
        $this->actionType = $actionType;
    }

    public function getDirname() {
        return $this->dirname;
    }

    public function setDirName($dirname) {
        $this->dirname = $dirname;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
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
