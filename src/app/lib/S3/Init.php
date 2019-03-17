<?php
namespace S3;

class Init {
    protected $s3Object;
    protected $bucketname;

    public function __construct($bucketname, $s3Object) {
        $this->s3Object = $s3Object;
        $this->bucketname = $bucketname;
        self::checkAvailableBucket($s3Object, $bucketname);
    }

    public static function checkAvailableBucket($s3Object = NULL, $bucketname, $s3Option = NULL) {
        if ($s3Option) {
            $s3Object = self::getS3Object($s3Option);
        }
        if ($s3Object) {
            if ($bucketname !== false) {
                if (!$s3Object->doesBucketExist($bucketname)) {
                    session_destroy();
                    throw new \Exception("Invalid bucket");
                }
            } else {
                die('Application Program Ended Abnormally');
            }
        }
    }

    public static function getS3Object($s3Option) {
        try {
            $s3Object = new \Aws\S3\S3Client($s3Option);
            return $s3Object;
        } catch(\InvalidArgumentException $e) {
            die($e->getMessage());
        }

    }

}
