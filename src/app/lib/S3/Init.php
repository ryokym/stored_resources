<?php
namespace S3;

class Init extends Filter {

    public static $S3Client = NULL;
    public static $bucketname = NULL;

    public function save() {
        self::$S3Client = $this->filteredS3Client;
        self::$bucketname = $this->filteredBucket;
    }
}
