<?php
namespace S3;

use Adapter\S3Adapter;

class Action extends Formatter
{
    private $S3Client;
    private $bucketname;

    public function __construct($request, $S3options, $bucketname)
    {
        parent::__construct($request);
        $data = S3Adapter::getS3AdaptionData($S3options, $bucketname);
        $this->S3Client = $data['S3Client'];
        $this->bucketname = $data['bucketname'];
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
        $s3Path = parent::getS3PathName($this->bucketname);
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
        $prefix = (parent::isRootDir()) ? $this->request->getName() : parent::getPathName();
        $results = $this->S3Client->listObjects([
            'Bucket' => $this->bucketname,
            'Prefix' => $prefix
        ]);
        foreach ($results['Contents'] as $result) {
            $this->S3Client->deleteObject([
                'Bucket' => $this->bucketname,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir()
    {
        $key = (parent::isRootDir()) ? $this->request->getName() : parent::getPathName();
        // 最後に/付けないとファイルになる
        $pathName = parent::appendDS($key);
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
        ]);
    }

    public function upload()
    {
        $dirName = parent::appendDS($this->request->getDirname());
        $pathName = $dirName.$this->request->getFileName();
        $this->S3Client->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
            'Body'   => fopen($this->request->getTmpFileName(), 'r')
        ]);
        echo $this->request->getFileName();
    }

    public static function logout()
    {
        session_destroy();
    }
}
