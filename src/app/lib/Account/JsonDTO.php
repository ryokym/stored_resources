<?php
namespace Account;

class JsonDTO {
    private $actionType;
    private $userName;
    private $password;
    private $bucket;

    public function getActionType() {
        return $this->actionType;
    }

    public function setActionType($actionType) {
        $this->actionType = $actionType;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function setUserName($userName) {
        $this->userName = $userName;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getBucket() {
        return $this->bucket;
    }

    public function setBucket($bucket) {
        $this->bucket = $bucket;
    }

    public function setProparties($proparties) {
        foreach ($proparties as $propaty => $param) {
            $this->$propaty = $param;
        }
    }
}
