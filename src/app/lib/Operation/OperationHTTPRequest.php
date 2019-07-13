<?php
/**
* Data Transfer Object with HTTP request parameters
*/

namespace Operation;

class OperationHTTPRequest
{
    private $actionType;
    private $dirname  = null;
    private $name     = null;
    private $level    = null;
    private $filename = null;
    private $content  = null;

    public function getActionType()
    {
        return $this->actionType;
    }

    public function setActionType($actionType)
    {
        $this->actionType = $actionType;
    }

    public function getDirname()
    {
        return $this->dirname;
    }

    public function setDirName($dirname)
    {
        $this->dirname = $dirname;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getLevel()
    {
        return $this->level;
    }

    public function setLevel($level)
    {
        $this->level = $level;
    }

    public function getFilename()
    {
        return $this->filename;
    }

    public function setFilename($filename)
    {
        $this->filename = $filename;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function setProperties($properties)
    {
        return $this->S3Object;
    }

    public function setS3Object($s3obj)
    {
        $this->S3Object = $s3obj;
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
