<?php
namespace S3;

class Action extends Formatter {

    public function __construct($myBucketName, $s3Object, $RequestDTO) {
        parent::__construct($myBucketName, $s3Object, $RequestDTO);
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function change() {
        if (!parent::isRootDirectory()) {
            $path = parent::prependDS($this->RequestDTO->getCurrentDirName());
            $this->RequestDTO->setCurrentDirName($path);
        }
        $s3Path = parent::formattedS3PathName();
        $response = array();

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
        $prefix = (parent::isRootDirectory())? $this->RequestDTO->getTargetName(): parent::formattedPathName();
        $results = $this->s3Object->listObjects([
            'Bucket' => $this->bucketName,
            'Prefix' => $prefix
        ]);
        foreach ($results['Contents'] as $result) {
            $this->s3Object->deleteObject([
                'Bucket' => $this->bucketName,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir() {
        $key = (parent::isRootDirectory())? $this->RequestDTO->getTargetName(): parent::formattedPathName();
        // 最後に/付けないとファイルになる
        $pathName = parent::appendDS($key);
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $this->s3Object->putObject([
            'Bucket' => $this->bucketName,
            'Key'    => $pathName,
        ]);
    }

    public function upload() {
        $dirName = parent::appendDS($this->RequestDTO->getCurrentDirName());
        $pathName = $dirName.$this->RequestDTO->getFileName();
        $this->s3Object->putObject(array(
            'Bucket' => $this->bucketName,
            'Key'    => $pathName,
            'Body'   => fopen($this->RequestDTO->getTmpFileName(), 'r')
        ));
        echo $this->RequestDTO->getFileName();
    }

    public static function logout() {
        session_destroy();
    }
}
