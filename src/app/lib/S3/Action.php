<?php
namespace S3;

class Action extends Formatter {

    public function __construct($bucketname, $s3Object, $RequestDTO) {
        parent::__construct($bucketname, $s3Object, $RequestDTO);
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function change() {
        if (!parent::isRootDir()) {
            $path = parent::prependDS($this->RequestDTO->getDirname());
            $this->RequestDTO->setDirName($path);
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

    public function remove() {
        $prefix = (parent::isRootDir())? $this->RequestDTO->getName(): parent::getPathName();
        $results = $this->s3Object->listObjects([
            'Bucket' => $this->bucketname,
            'Prefix' => $prefix
        ]);
        foreach ($results['Contents'] as $result) {
            $this->s3Object->deleteObject([
                'Bucket' => $this->bucketname,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir() {
        $key = (parent::isRootDir())? $this->RequestDTO->getName(): parent::getPathName();
        // 最後に/付けないとファイルになる
        $pathName = parent::appendDS($key);
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $this->s3Object->putObject([
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
        ]);
    }

    public function upload() {
        $dirName = parent::appendDS($this->RequestDTO->getDirname());
        $pathName = $dirName.$this->RequestDTO->getFileName();
        $this->s3Object->putObject(array(
            'Bucket' => $this->bucketname,
            'Key'    => $pathName,
            'Body'   => fopen($this->RequestDTO->getTmpFileName(), 'r')
        ));
        echo $this->RequestDTO->getFileName();
    }

    public static function logout() {
        session_destroy();
    }
}
