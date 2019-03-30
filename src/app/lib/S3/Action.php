<?php
namespace S3;

class Action extends Formatter
{
    public function __construct($request)
    {
        parent::__construct($request);
    }

    public function execute($actionType)
    {
        return $this->$actionType();
    }

    public function change()
    {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->request->getDirname());
            $this->request->setDirName($path);
        }
        $s3Path = parent::getS3PathName();
        $response = [];
        if (is_dir($s3Path)) {
            $response['isFile'] = false;
            $response['result'] = scandir($s3Path);
            $response['result'] = array_values($response['result']);
        } else {
            $response['isFile'] = true;
            $file = parent::getOpenFileOnlyRead($s3Path);
            $response['result'] = parent::getLines($file);
        }
        $response = json_encode($response);
        echo $response;
    }

    public function remove()
    {
        $prefix = (parent::isRootDir())? $this->request->getName(): parent::getPathName();
        $results = self::$S3Client->listObjects([
            'Bucket' => self::$bucketname,
            'Prefix' => $prefix
        ]);
        foreach ($results['Contents'] as $result) {
            self::$S3Client->deleteObject([
                'Bucket' => self::$bucketname,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir()
    {
        $key = (parent::isRootDir())? $this->request->getName(): parent::getPathName();
        // 最後に/付けないとファイルになる
        $pathName = parent::appendDS($key);
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        self::$S3Client->putObject([
            'Bucket' => self::$bucketname,
            'Key'    => $pathName,
        ]);
    }

    public function upload()
    {
        $dirName = parent::appendDS($this->request->getDirname());
        $pathName = $dirName.$this->request->getFileName();
        self::$S3Client->putObject(array(
            'Bucket' => self::$bucketname,
            'Key'    => $pathName,
            'Body'   => fopen($this->request->getTmpFileName(), 'r')
        ));
        echo $this->request->getFileName();
    }

    public static function logout()
    {
        session_destroy();
    }
}
