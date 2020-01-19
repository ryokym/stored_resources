<?php

namespace App\Operation;

use App\Common\Common;
use App\DataTransferInterface;

class S3OptionFormatter extends S3StreamException
{
    protected $request;

    public function __construct(DataTransferInterface $request)
    {
        $this->request = $request;
    }

    protected function getPathName()
    {
        $pathName = $this->request->getPath() . '/' . $this->request->getName();
        return $pathName;
    }

    protected function getS3PathName($bucketname, $specified = null)
    {
        if (!$specified) {
            $pathName = $this->getPathName();
        } else {
            $pathName = $this->prependDS($specified);
        }
        return Common::S3_PROTOCOL . $bucketname . $pathName;
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
        if (empty($this->request->getPath())) {
            return true;
        }
    }
}
