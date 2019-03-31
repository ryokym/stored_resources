<?php
namespace Adapter;

class S3BucketConnection
{
    use \BucketChecker;

    private static $S3Client;
    private static $bucketname;

    private function __construct($s3Options, $bucketname)
    {
        self::$S3Client = $this->getS3Client($s3Options);
        self::$bucketname = ($this->checkBucket($bucketname, self::$S3Client))? $bucketname: null;
    }

    public static function getS3ConnectionData($s3Options, $bucketname) {
        $data = [];
		if (!isset(self::$S3Client)) {
			new self($s3Options, $bucketname);
		}
        $data = [
            'S3Client' => self::$S3Client,
            'bucketname' => self::$bucketname,
        ];
		return $data;
	}
}
