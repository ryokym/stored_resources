<?php
require_once(dirname(__DIR__).'/include/initialize.php');
require_once(dirname(__DIR__).'/ajax/DTO.ajax.php');

class AjaxAction extends PostJsonDTO {

    public function __construct() {
        parent::__construct();
    }

    public function execute($actionType) {
        return $this->$actionType();
    }

    public function change() {

        if (parent::getCurrentLevel() > 1) {
            $dir = '/'.parent::getCurrentDirName();
        } else {
            $dir = parent::getCurrentDirName();
        }
        $isDir = is_dir(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.parent::getTargetName());
        if ($isDir) {
            $nextItemLists = scandir(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.parent::getTargetName());
            $nextItemLists = array_values($nextItemLists);
            $response = json_encode($nextItemLists);
            echo $response;
        } else {
            $response = '';
            $fileName = fopen(S3_PROTOCOL.BUCKET_NAME.$dir.'/'.parent::getTargetName(), 'r', true);
            while (!feof($fileName)) {
                $response .= fgets($fileName);
            }
            fclose($fileName);
            echo htmlspecialchars($response);
        }
    }

    public function remove() {
        global $s3;
        $dropedPathName = parent::getCurrentDirName().'/'.parent::getTargetName();
        $results = $s3->listObjects([
            'Bucket' => BUCKET_NAME,
            'Prefix' => $dropedPathName
        ]);
        foreach ($results['Contents'] as $result) {
            $s3->deleteObject([
                'Bucket' => BUCKET_NAME,
                'Key' => $result['Key']
            ]);
        }
    }

    public function makedir() {
        global $s3;
        // streamWrapperではBucketは作れる(mkdir()で)がDirectoryは作れない
        // mkdir(S3_PROTOCOL.$currentDirName.$newDirName);
        $s3->putObject([
            'Bucket' => BUCKET_NAME,
            // 最後に/付けないとファイルになる
            'Key'    => parent::getCurrentDirName().'/'.parent::getTargetName().'/',
        ]);
        echo parent::getCurrentDirName().'/'.parent::getTargetName().'/';
    }

    public function upload() {
        global $s3;
        $uploadDir = parent::getCurrentDirName();
        $fileName = parent::getFileName();
        $tmpFile = parent::getTmpFileName();

        if (!empty($uploadDir)) $uploadDir.= '/';
        try {
            $s3->putObject(array(
                'Bucket' => BUCKET_NAME,
                'Key'    => $uploadDir.$fileName,
                'Body'   => fopen($tmpFile, 'r')
            ));
        } catch (S3Exception $e) {
            echo $e->getMessage();
        }
    }
}
