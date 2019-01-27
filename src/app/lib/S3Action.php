<?php
namespace Ajax;
use Ajax\Formatter;

class S3Action extends Formatter {

    public function __construct($myBucketName, $s3Object, $jsonDTO) {
        parent::__construct($myBucketName, $s3Object, $jsonDTO);
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function change() {
        $path = $this->jsonDTO->getCurrentDirName();
        if (!empty($path)) {
            parent::prependDS($path);
            $this->jsonDTO->setCurrentDirName($path);
        }
        $s3Path = parent::formattedS3PathName();
        if (is_dir($s3Path)) {
            $response = array();
            $nextItemLists = scandir($s3Path);
            $nextItemLists = array_values($nextItemLists);
            $response = json_encode($nextItemLists);
            echo $response;
        } else {
            $response = '';
            $file = fopen($s3Path, 'r', true);
            foreach (parent::getLines($file) as $line) {
                $response .= $line;
            }
            fclose($file);
            echo htmlspecialchars($response);
        }
    }

    public function remove() {
        $results = $this->s3Object->listObjects([
            'Bucket' => $this->bucketName,
            'Prefix' => parent::formattedPathName()
        ]);
        foreach ($results['Contents'] as $result) {
            $this->s3Object->deleteObject([
                'Bucket' => $this->bucketName,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir() {
        $key = (empty($this->jsonDTO->getCurrentDirName()))? $this->jsonDTO->getTargetName(): parent::formattedPathName();
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
        $dirName = parent::appendDS($this->jsonDTO->getCurrentDirName());
        $pathName = $dirName.$this->jsonDTO->getFileName();
        try {
            $this->s3Object->putObject(array(
                'Bucket' => $this->bucketName,
                'Key'    => $pathName,
                'Body'   => fopen($this->jsonDTO->getTmpFileName(), 'r')
            ));
        } catch (S3Exception $e) {
            echo $e->getMessage();
        }
        echo $this->jsonDTO->getFileName();
    }
}
