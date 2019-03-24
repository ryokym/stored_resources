<?php
use \Aws\S3\S3Client;

trait BucketChecker {

    private function checkBucket($bucketname, $S3Client) {
        if (!$S3Client->doesBucketExist($bucketname)) {
            return false;
        } else {
            return true;
        }
    }

    protected function getS3Client($s3Options) {
        try {
            $S3Client = new S3Client($s3Options);
            return $S3Client;
        } catch(\InvalidArgumentException $e) {
            die($e->getMessage());
        }
    }
}
