<?php
namespace Common;

class Stream extends \SplFileObject
{
    public function readAsJson($contents)
    {
        if (is_array($result = json_decode($contents, true))) {
            return $result;
        }
    }

    public function foverwrite($contents, $format = null)
    {
        if ($format === 'json') {
            $contents = json_encode($contents);
        }
        $this->fclear();
        $size = strlen($contents);
        parent::fwrite($contents, $size);
    }

    private function fclear()
    {
        parent::ftruncate(0);
        parent::rewind();
    }
}
