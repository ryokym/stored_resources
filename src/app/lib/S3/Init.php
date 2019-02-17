<?php
namespace S3;

class Init {
    protected $s3Object;
    protected $bucketName;

    public function __construct($bucketName, $s3Object) {
        $this->s3Object = $s3Object;
        $this->bucketName = $bucketName;
        self::checkAvailableBucket($s3Object, $bucketName);
    }

    public static function checkAvailableBucket($s3Object=NULL, $bucketName, $S3Option=NULL) {
        if ($S3Option) {
            $s3Object = self::getS3Object($S3Option);
        }
        if ($s3Object) {
            if ($bucketName !== false) {
                if (!$s3Object->doesBucketExist($bucketName)) {
                    session_destroy();
                    throw new \Exception("Invalid bucket");
                }
            } else {
                die('Application Program Ended Abnormally');
            }
        }
    }

    public static function getS3Object($S3Option) {
        try {
            $s3Object = new \Aws\S3\S3Client($S3Option);
            return $s3Object;
        } catch(\InvalidArgumentException $e) {
            die($e->getMessage());
        }

    }

}
