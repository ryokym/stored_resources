<?php
require_once(dirname(__DIR__).'/include/initialize.php');
require_once(dirname(__DIR__).'/ajax/formatter.ajax.php');

class AjaxAction extends JsonFormatter {

    public function __construct() {
        parent::__construct();
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function change() {
        $pathName = parent::getPathName();
        if (parent::getCurrentLevel() > 1) $pathName = '/'.$pathName;
        // $S3PathName = parent::getS3pathName();
        if (is_dir(self::_S3Protcol.self::_bucketName.$pathName)) {
            $nextItemLists = scandir(self::_S3Protcol.self::_bucketName.$pathName);
            $nextItemLists = array_values($nextItemLists);
            $response = json_encode($nextItemLists);
            echo $response;
        } else {
            $response = '';
            $file = fopen(self::_S3Protcol.self::_bucketName.$pathName, 'r', true);
            while (!feof($file)) {
                $response .= fgets($file);
            }
            fclose($file);
            echo htmlspecialchars($response);
        }
    }

    public function remove() {
        $s3 = parent::getS3Object();
        $results = $s3->listObjects([
            'Bucket' => self::_bucketName,
            'Prefix' => parent::getPathName()
        ]);
        foreach ($results['Contents'] as $result) {
            $s3->deleteObject([
                'Bucket' => self::_bucketName,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir() {
        $s3 = parent::getS3Object();
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $s3->putObject([
            'Bucket' => self::_bucketName,
            // 最後に/付けないとファイルになる
            'Key'    => parent::getPathName().'/'
        ]);
        echo parent::getS3pathName();
    }

    public function upload() {
        $s3 = parent::getS3Object();
        try {
            $s3->putObject(array(
                'Bucket' => self::_bucketName,
                'Key'    => parent::getCurrentDirName().'/'.parent::getFileName(),
                'Body'   => fopen(parent::getTmpFileName(), 'r')
            ));
        } catch (S3Exception $e) {
            echo $e->getMessage();
        }
        echo self::_bucketName;
        echo parent::getCurrentDirName().'/'.parent::getFileName();
        echo parent::getTmpFileName();
    }
}
