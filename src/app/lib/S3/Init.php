<?php
namespace S3;

class Init extends Filter
{
    public static $S3Client = null;
    public static $bucketname = null;

    public function save()
    {
        self::$S3Client = $this->filteredS3Client;
        self::$bucketname = $this->filteredBucket;
    }
}
