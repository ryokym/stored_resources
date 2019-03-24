<?php
/**
* Data Transfer Object with HTTP request parameters
*/

namespace Account;

class Request {
    private $actionType;
    private $userName;
    private $password;
    private $bucket;
    private $bucketkey = NULL;
    private $bucketval = NULL;

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

    public function getBucketkey() {
        return $this->bucketkey;
    }

    public function setBucketkey($bucketkey) {
        $this->bucketkey = $bucketkey;
    }

    public function getBucketval() {
        return $this->bucketval;
    }

    public function setBucketval($bucketval) {
        $this->bucketval = $bucketval;
    }

    public function setProparties($proparties) {
        foreach ($proparties as $propaty => $param) {
            $this->$propaty = $param;
        }
    }

    /**
    * Get all the values ​​set in the property
    * @return array
    */
    public function getPropaties() {
        $results = [];
        $props = array_keys(get_class_vars(get_class($this)));
        foreach ($props as $prop) {
            $results[$prop] = $this->$prop;
        }
        return $results;
    }
}
