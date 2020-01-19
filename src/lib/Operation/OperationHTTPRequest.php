<?php

/**
 * Data Transfer Object with HTTP request parameters
 */

namespace App\Operation;

use App\DataTransferInterface;

class OperationHTTPRequest implements DataTransferInterface
{
    private $actionType;
    private $path  = null;
    private $name     = null;
    private $hierarchy    = null;
    private $filename = null;
    private $content  = null;
    private $cliped   = null;

    public function getActionType()
    {
        return $this->actionType;
    }

    public function setActionType($actionType)
    {
        $this->actionType = $actionType;
    }

    public function getPath()
    {
        return $this->path;
    }

    public function setPath($path)
    {
        $this->path = $path;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getHierarchy()
    {
        return $this->hierarchy;
    }

    public function setHierarchy($hierarchy)
    {
        $this->hierarchy = $hierarchy;
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

    public function getCliped()
    {
        return $this->cliped;
    }

    public function setCliped($cliped)
    {
        $this->cliped = $cliped;
    }

    public function setProperties($properties)
    {
        foreach ($properties as $property => $param) {
            $this->$property = $param;
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
     */
    public function getValues(array $propnames)
    {
        if (!empty($propnames)) {
            $getter = 'get';
            $values = [];
            foreach ($propnames as $propname) {
                $values[] = $this->{$getter . ucfirst($propname)}();
            }
            return $values;
        } else {
            return $this->All();
        }
    }
}
