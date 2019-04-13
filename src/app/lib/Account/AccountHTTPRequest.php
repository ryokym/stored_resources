<?php
/**
* Data Transfer Object with HTTP request parameters
*/

namespace Account;

class AccountHTTPRequest
{
    private $actionType;
    private $username;
    private $password;
    private $bucket;
    private $bucketkey = null;
    private $bucketval = null;

    public function getActionType()
    {
        return $this->actionType;
    }

    public function setActionType($actionType)
    {
        $this->actionType = $actionType;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getBucket()
    {
        return $this->bucket;
    }

    public function setBucket($bucket)
    {
        $this->bucket = $bucket;
    }

    public function getBucketkey()
    {
        return $this->bucketkey;
    }

    public function setBucketkey($bucketkey)
    {
        $this->bucketkey = $bucketkey;
    }

    public function getBucketval()
    {
        return $this->bucketval;
    }

    public function setBucketval($bucketval)
    {
        $this->bucketval = $bucketval;
    }

    public function setProparties($proparties)
    {
        foreach ($proparties as $propaty => $param) {
            $this->$propaty = $param;
        }
    }

    /**
    * retrieving all data
    * @return array
    */
    public function All()
    {
        $results = [];
        $props = array_keys(get_class_vars(get_class($this)));
        foreach ($props as $prop) {
            $results[$prop] = $this->$prop;
        }
        return $results;
    }

    /**
    * retrieving properties that specified names of array
    *
    */
    public function getValues(array $propnames)
    {
        if (!empty($propnames)) {
            $getter = 'get';
            $values = [];
            foreach ($propnames as $propname) {
                $values[] = $this->{$getter.ucfirst($propname)}();
            }
            return $values;
        } else {
            return $this->All();
        }
    }
}
