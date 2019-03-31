<?php
namespace S3;

use \Common\Common;

class Filter
{
    use \TokenChecker;

    protected $filteredS3Client = null;
    protected $filteredBucket = null;

    /**
    * Action Upload
    */
    public static function isValidFile($file)
    {
        if ($file['size'] > Common::MIN_FILE_SIZE
        && strlen($file['name']) <= Common::MAX_LENGTH
        && preg_match(Common::EXCLUDED_PATTERN, $file['name']) === 1) {
            return true;
        } else {
            throw new \Exception('ERROR / Uploaded files can not be accepted');
        }
    }

    /**
    * Action Change
    */
    protected function isTolerableLineCount($count)
    {
        if ($count === Common::LIMIT_LINE) {
            throw new \Exception('{"result":"ERROR. It can not be displayed because it exceeds '.$count.' rows with the maximum number of lines"}');
        } else {
            return true;
        }
    }

    protected function getDisOpenFileException()
    {
        throw new \Exception('{"result":"ERROR. No such file or directory"}');
    }

    public static function isAuthenticatesToken($tokenfpath, $token)
    {
        $contents = self::getTokenList($tokenfpath);
        $iscomeup = self::lookupToken($contents, $token);
        return ($iscomeup) ? true : false;
    }

    // public function isAvailableBucket($s3Options)
    // {
    //     if ($S3Client = $this->getS3Client($s3Options)) {
    //         $this->filteredS3Client = $S3Client;
    //         return $S3Client;
    //     } else {
    //
    //     }
    // }
    //
    // public function isAvailableBucket2($bucketname, $S3Client) {
    //     if ($availableBucket = $this->checkBucket($bucketname, $S3Client)) {
    //         return $availableBucket;
    //     } else {
    //
    //     }
    // }

}
