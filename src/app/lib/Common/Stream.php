<?php
namespace App\Common;

class Stream extends \SplFileObject
{
    public $contents = '';

    public function read()
    { 
        $size = $this->getSize();
        if ($size) {
            $this->contents =  $this->fread($size);
        } else {
            return false;
        }
        
    }

    public function add($str)
    {
        $this->contents = $this->contents.$str;
    }

    public function convertJson()
    {
        if (is_array($result = json_decode($this->contents, true))) {
            return $result;
        }
    }

    private function fclear()
    {
        parent::ftruncate(0);
        parent::rewind();
    }

    public function foverwrite($newContents, $format = null)
    {
        $this->contents = $newContents;
        if ($format === 'json') {
            $this->contents = json_encode($this->contents);
        }
        $this->fclear();
        $size = strlen($this->contents);
        parent::fwrite($this->contents, $size);
    }
}
