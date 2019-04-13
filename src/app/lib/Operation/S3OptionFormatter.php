<?php
namespace Operation;

use Common\Common;

class S3OptionFormatter extends S3StreamException
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    protected function getPathName()
    {
        $pathName = $this->request->getDirname().'/'.$this->request->getName();
        return $pathName;
    }

    protected function getS3PathName($bucketname)
    {
        $pathName = $this->getPathName();
        return Common::S3_PROTOCOL.$bucketname.$pathName;
    }

    protected function prependDS($str)
    {
        $str = substr_replace($str, '/', 0, 0);
        return $str;
    }

    protected function appendDS($str)
    {
        $len = strlen($str);
        $str = substr_replace($str, '/', $len, 0);
        return $str;
    }

    protected function isRootDir()
    {
        if (empty($this->request->getDirname())) {
            return true;
        }
    }
}
