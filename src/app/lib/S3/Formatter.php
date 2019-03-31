<?php
namespace S3;

use \Common\Common;

class Formatter extends Filter
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

    protected function getOpenFileOnlyRead($path)
    {
        if (file_exists($path)) {
            $file = fopen($path, 'r', true);
            return $file;
        } else {
            parent::getDisOpenFileException();
        }
    }

    private function getLinesGenerator($fName)
    {
        while (($line = fgets($fName)) !== false) {
            yield $line;
        }
    }

    protected function getLines($fName)
    {
        $response = '';
        $lineCnt = 0;
        try {
            foreach ($this->getLinesGenerator($fName) as $line) {
                if (parent::isTolerableLineCount($lineCnt)) {
                    $response .= $line;
                    $lineCnt++;
                }
            }
            return htmlspecialchars($response);
        } finally {
            fclose($fName);
        }
    }

    public static function getFiles($fileName)
    {
        $file = $_FILES[$fileName];
        if (parent::isValidFile($file)) {
            return $file;
        }
    }

    public static function getRootdirItems($bucketname)
    {
        $rows[] = scandir(Common::S3_PROTOCOL.$bucketname);
        $rows = array_values($rows[0]);
        return $rows;
    }
}
