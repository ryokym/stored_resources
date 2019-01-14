<?php
class PostJsonDTO {
    private $action;
    private $currentDirName;
    private $targetName = null;
    private $currentLevel = null;
    private $fileName = null;
    private $tmpFileName = null;

    public function __construct() {
        $this->$action = filter_input(INPUT_POST, 'action');
        $this->currentDirName = filter_input(INPUT_POST, 'currentDirName');
        $this->targetName = filter_input(INPUT_POST, 'targetName');
        $this->currentLevel = filter_input(INPUT_POST, 'currentLevel');
        // $this->fileName = filter_input(INPUT_POST, 'fileName');
        // $this->tmpFileName = filter_input(INPUT_POST, 'tmpFileName');
        $this->fileName = $_FILES['file']['name'];
        $this->tmpFileName = $_FILES['file']['tmp_name'];
    }

    public function getAction() {
        return $this->action;
    }

    public function getCurrentDirName() {
        return $this->currentDirName;
    }

    public function getTargetName() {
        return $this->targetName;
    }

    public function getCurrentLevel() {
        return $this->currentLevel;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getTmpFileName() {
        return $this->tmpFileName;
    }
}
